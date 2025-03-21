/**
 * @ (#) UserServiceImpl.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.TopCustomerResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.Role;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.exception.EmailAlreadyExistsException;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;
import vn.edu.iuh.fit.repositories.OrderDetailRepository;
import vn.edu.iuh.fit.repositories.RoleRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.repositories.RefreshTokenRepository;
import vn.edu.iuh.fit.security.CustomUserDetails;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.services.UserService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import static vn.edu.iuh.fit.utils.ImageUtil.isValidSuffixImage;
import static vn.edu.iuh.fit.utils.ImageUtil.saveFile;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private JwtTokenProvider jwtUtils;

    // Phương thức chuyển đổi User sang DTO với kiểu generic T
    private <T> T convertToDto(User user, Class<T> targetClass) {
        return modelMapper.map(user, targetClass);
    }

    // Phương thức chuyển đổi DTO sang User với kiểu generic T
    private <T> User convertToEntity(T tDto, Class<T> dtoClass) {
        return modelMapper.map(tDto, User.class);
    }


    @Override
    public void validation(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException {
        // Kiem tra username da ton tai chua?

        if (this.existsUsername(userRequest.getUsername())) {
            result.addError(new FieldError("userRequest", "username",
                    "Username already exists. Please enter another username!"));
//            throw new UserAlreadyExistsException("Username already exist");
        }
        if (this.existsEmail(userRequest.getEmail())) {
            result.addError(new FieldError("userRequest", "email",
                    "Email already exists. Please enter another email!"));
//            throw new EmailAlreadyExistsException("Email already exist");
        }

        if (!userRequest.getPassword().equals(userRequest.getConfirmPassword())) {
            result.addError(new FieldError("userRequest", "confirmPassword",
                    "Password not match"));
//            throw new IllegalArgumentException("Password not match");
        }

        // Lấy day/month/year hiện tại, 11/2/2024 -> tru 15 năm -> 11/2/2009
        // giả sử một người có sinh nhật 1/2/2009 -> 1/2/2009 đã đu tuổi so voi day/month/year hiện tại
        // nên dùng isBefore (truoc rồi phủ định) chứ không dùng isAfter
        if (!userRequest.getDob().isBefore(LocalDate.now().minusYears(15))) {
            result.addError(new FieldError("userRequest", "dob",
                    "User is under 15 years old"));
//            throw new IllegalArgumentException("User is under 15 years old");
        }
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        if ("anonymousUser".equals(username)) {
            return null;
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + username));
        return this.convertToDto(user, UserResponse.class);
    }

    @Override
    public Map<String, Object> getCurrentUser(String token) {
        String jwt = token.replace("Bearer ", "");
        String username = jwtUtils.getUserNameFromJWT(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + username));

        CustomUserDetails customUserDetails = new CustomUserDetails(this.convertToDto(user, UserResponse.class));
        List<String> roles = customUserDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return Map.of(
                "username", user.getUsername(),
                "roles", roles
        );
    }

    @Override
    public UserResponse createUser(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException {

        Role role = roleRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 1"));
        validation(userRequest, result);
        if (!result.hasErrors()) {
            User user = this.convertToEntity(userRequest, UserRequest.class);
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            user.setRole(role);
            user.setActive(false);
            user.setImage("avtdefault.jpg");

            user = userRepository.save(user);

            return this.convertToDto(user, UserResponse.class);
        }
        return null;
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Can not find User with id: " + id));
        System.out.println(user);
        Role role = roleRepository.findById(userRequest.getRoleId()).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 1"));

        try {
            user.setFirstname(userRequest.getFirstName());
            user.setLastname(userRequest.getLastName());
            user.setEmail(userRequest.getEmail());
            user.setPhoneNumber(userRequest.getPhoneNumber());
            user.setGender(userRequest.getGender());
            user.setDayOfBirth(userRequest.getDob());
            user.setRole(role);
            user.setUpdatedAt(LocalDateTime.now());

            MultipartFile file = userRequest.getImage();
            String image="";
            if(file == null || file.isEmpty()) {
                image = "avtdefault.jpg";
            } else {
                if (!isValidSuffixImage(Objects.requireNonNull(file.getOriginalFilename()))) {
                    throw new BadRequestException("Invalid image format");
                }

                image = saveFile(file);
            }

            user.setImage(image);
            System.out.println(user);
            user = userRepository.save(user);
            return this.convertToDto(user, UserResponse.class);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return null;
    }

    @Override
    public UserResponse findById(Long id) {
        return this.convertToDto(userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Can not find User with id: " + id)), UserResponse.class);
    }

    @Override
    public boolean existsUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserResponse findByUsername(String username) {
        return this.convertToDto(userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + username)), UserResponse.class);
    }

    @Override
    public UserResponse createUserRoleManager(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException {
        Role role = roleRepository.findById(3L).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 3"));

        validation(userRequest, result);

        if (!result.hasErrors()) {
            User user = this.convertToEntity(userRequest, UserRequest.class);
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            user.setRole(role);
            user.setActive(false);
            user.setImage("avtdefault.jpg");

            user = userRepository.save(user);

            return this.convertToDto(user, UserResponse.class);
        }
        return null;
    }

    @Override
    public List<UserResponse> findAll() {
        List<User> users = userRepository.findAll();
        if (users != null) {
            return users.stream()
                    .map(user -> this.convertToDto(user, UserResponse.class))
                    .toList();
        }
        return null;
    }

    @Override
    public PageResponse<UserResponse> getUsersByPage(int pageNo, int pageSize) {
        Sort sort = Sort.by("id").ascending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<User> users = userRepository.findAll(pageable);
        PageResponse<UserResponse> pageDto = new PageResponse<>();
        if (users != null) {
            pageDto.setPage(pageNo);
            pageDto.setSize(pageSize);
            pageDto.setTotal(users.getNumberOfElements());
            pageDto.setTotalPages(users.getTotalPages());
            pageDto.setValues(users.stream().map(user -> this.convertToDto(user, UserResponse.class)).toList());
        }
        return pageDto;
    }

    @Override
    public List<TopCustomerResponse> getTopCustomers(LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atStartOfDay();
        return orderDetailRepository.findTopCustomers(startDateTime, endDateTime);
    }

    @Override
    public int countByRoleUser() {
        return userRepository.countByRoleUser("USER");
    }

    @Override
    public int countByRoleManager() {
        return userRepository.countByRoleUser("MANAGER");
    }

    @Override
    public UserResponse updateUserInfo(Long userId, UserRequest userRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Can not find User with id: " + userId));
        modelMapper.map(userRequest, user);
        User updatedUser = userRepository.save(user);
        return this.convertToDto(updatedUser, UserResponse.class);
    }
}

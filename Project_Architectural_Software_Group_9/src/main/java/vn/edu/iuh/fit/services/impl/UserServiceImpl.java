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
import vn.edu.iuh.fit.dtos.EmailVerifyEntry;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.TopCustomerResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.Role;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.enums.TypeProviderAuth;
import vn.edu.iuh.fit.exception.EmailAlreadyExistsException;
import vn.edu.iuh.fit.exception.ItemNotFoundException;
import vn.edu.iuh.fit.exception.SendEmailException;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;
import vn.edu.iuh.fit.repositories.OrderDetailRepository;
import vn.edu.iuh.fit.repositories.RoleRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.repositories.RefreshTokenRepository;
import vn.edu.iuh.fit.security.CustomUserDetails;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.services.CloudinaryService;
import vn.edu.iuh.fit.services.EmailService;
import vn.edu.iuh.fit.services.UserService;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
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

    @Autowired
    private EmailService emailService;

    @Autowired
    private CloudinaryService cloudinaryService;

    private final Map<String, EmailVerifyEntry> emailVerifyMap = new ConcurrentHashMap<>();

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
        }
        if (this.existsEmail(userRequest.getEmail())) {
            result.addError(new FieldError("userRequest", "email",
                    "Email already exists. Please enter another email!"));
        }

        if (this.existsPhone(userRequest.getPhoneNumber())) {
            result.addError(new FieldError("userRequest", "phone",
                    "Phone already exists. Please enter another Phone!"));
        }

        if(userRequest.getPassword() == null || userRequest.getConfirmPassword() == null) {
            result.addError(new FieldError("userRequest", "password",
                    "Password is required"));
        } else if (!userRequest.getPassword().equals(userRequest.getConfirmPassword())) {
            result.addError(new FieldError("userRequest", "confirmPassword",
                    "Password not match"));
        }

        // Lấy day/month/year hiện tại, 11/2/2024 -> tru 15 năm -> 11/2/2009
        // giả sử một người có sinh nhật 1/2/2009 -> 1/2/2009 đã đu tuổi so voi day/month/year hiện tại
        // nên dùng isBefore (truoc rồi phủ định) chứ không dùng isAfter
        if (userRequest.getDob() == null) {
            result.addError(new FieldError("userRequest", "dob",
                    "Date of birth is required"));
        } else if (!userRequest.getDob().isBefore(LocalDate.now().minusYears(15))) {
            result.addError(new FieldError("userRequest", "dob",
                    "User is under 15 years old"));
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
    public Map<String, Object> getRolesUserByToken(String token) {
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
    public UserResponse getCurrentUser(String token) {
        String jwt = token.replace("Bearer ", "");
        String username = jwtUtils.getUserNameFromJWT(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + username));
        return this.convertToDto(user, UserResponse.class);
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
            user.setProviderAuth(TypeProviderAuth.LOCAL);

            user = userRepository.save(user);

            // Gửi email xác thực tài khoản
            try {
                String verifyToken = UUID.randomUUID().toString();
                long now = Instant.now().toEpochMilli();

                emailVerifyMap.put(user.getEmail(), new EmailVerifyEntry(verifyToken, now));

                emailService.sendEmailToVerifyAccount(user.getLastname() + " " + user.getFirstname(),
                        user.getEmail(), verifyToken);
            } catch (SendEmailException e) {
                throw new RuntimeException(e);
            }

            return this.convertToDto(user, UserResponse.class);
        }
        return null;
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Can not find User with id: " + id));
        System.out.println(user);
        Role role = roleRepository.findById(userRequest.getRoleId()).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 1"));
        if(userRequest.getPhoneNumber().equals("0123456789")) {
            userRequest.setPhoneNumber("");
        }
        if(userRequest.getEmail().equals("example@gmail.com")) {
            userRequest.setEmail("");
        }
        try {
            if(userRequest.getFirstName() != null || !userRequest.getFirstName().isEmpty()) {
                user.setFirstname(userRequest.getFirstName());
            }
            if(userRequest.getLastName() != null || !userRequest.getLastName().isEmpty()) {
                user.setLastname(userRequest.getLastName());
            }

            if(userRequest.getPassword() != null || !userRequest.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
            }
            if(userRequest.getPhoneNumber() != null || !userRequest.getPhoneNumber().isEmpty()) {
                user.setPhoneNumber(userRequest.getPhoneNumber());
            }
            if(userRequest.getEmail() != null || !userRequest.getEmail().isEmpty()) {
                user.setEmail(userRequest.getEmail());
            }
            if(userRequest.getDob() != null) {
                user.setDayOfBirth(userRequest.getDob());
            }
            if(userRequest.getGender() != null || !userRequest.getGender().isEmpty()) {
                user.setGender(userRequest.getGender());
            }
            user.setFirstname(userRequest.getFirstName());
            user.setLastname(userRequest.getLastName());
            user.setEmail(userRequest.getEmail());
            user.setPhoneNumber(userRequest.getPhoneNumber());
            user.setGender(userRequest.getGender());
            user.setDayOfBirth(userRequest.getDob());
            user.setRole(role);
            user.setActive(userRequest.isActive());
            user.setUpdatedAt(LocalDateTime.now());

            MultipartFile file = userRequest.getImage();
            if (file != null && !file.isEmpty()) {
                if (!isValidSuffixImage(Objects.requireNonNull(file.getOriginalFilename()))) {
                    throw new BadRequestException("Invalid image format");
                }
                String image = cloudinaryService.uploadImage(file);
                user.setImage(image); // chỉ set nếu có file mới
            }
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
    public boolean existsPhone(String phone) {
        return userRepository.existsByPhoneNumber(phone);
    }

    @Override
    public UserResponse findByUsername(String username) {
        return this.convertToDto(userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("Can not find User with username: " + username)), UserResponse.class);
    }

    @Override
    public UserResponse createUserRoleManager(UserRequest userRequest, BindingResult result)
            throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException {

        Role role = roleRepository.findById(userRequest.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: " + userRequest.getRoleId()));

        // Kiểm tra dữ liệu đầu vào
        validation(userRequest, result);
        if (result.hasErrors()) {
            throw new MethodArgumentNotValidException(null, result);
        }

        try {
            // Chuyển đổi từ DTO sang entity
            User user = new User();
            user.setUsername(userRequest.getUsername());
            user.setFirstname(userRequest.getFirstName());
            user.setLastname(userRequest.getLastName());
            user.setEmail(userRequest.getEmail());
            user.setPhoneNumber(userRequest.getPhoneNumber());
            user.setGender(userRequest.getGender());
            user.setDayOfBirth(userRequest.getDob());
            user.setRole(role);
            user.setActive(userRequest.isActive());
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            user.setProviderAuth(TypeProviderAuth.LOCAL);

            // Mã hóa mật khẩu trước khi lưu
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

            // Xử lý ảnh đại diện
            MultipartFile file = userRequest.getImage();
            String image = "avtdefault.jpg"; // Ảnh mặc định

            if (file != null && !file.isEmpty()) {
                if (!isValidSuffixImage(Objects.requireNonNull(file.getOriginalFilename()))) {
                    throw new BadRequestException("Invalid image format");
                }
                image = saveFile(file);
            }

            user.setImage(image);

            // Lưu user vào database
            user = userRepository.save(user);


            return this.convertToDto(user, UserResponse.class);
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage());
            throw new RuntimeException("Error creating user: " + e.getMessage());
        }
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

    @Override
    public boolean verifyAccount(String email,String token) {
        System.out.println("verifyAccount: " + email + " " + token);

        EmailVerifyEntry entry = emailVerifyMap.get(email);
        System.out.println("entry: " + entry);
        if(entry == null) return false;

        long currentTime = Instant.now().toEpochMilli();
        long TTL_MILLIS = 3 * 60 * 1000; // 3 phút
        if(currentTime - entry.getTimestamp() > TTL_MILLIS) {
            // Token đã hết hạn
            emailVerifyMap.remove(email);
            return false;
        }
        if(entry.getTokenVerify().equals(token)) {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new ItemNotFoundException("Can not find User with email: " + email));
            user.setActive(true);

            userRepository.save(user);

            emailVerifyMap.remove(email);
            // Xóa token sau khi xác thực thành công
            return true;
        }
        return false;
    }

    @Override
    public User createGoogleUser(String email, String name, String imageUrl) {
        Role role = roleRepository.findById(1L).orElseThrow(() -> new IllegalArgumentException("Can not find Role with id: 1"));
        Random random = new Random();
        String username = email.substring(0, email.indexOf("@")) + random.nextInt(1000);
        User user = User.builder()
                .username(username)
                .email(email)
                .firstname(name)
                .image(imageUrl)
                .providerAuth(TypeProviderAuth.GOOGLE)
                .active(true)
                .role(role)
                .build();
        user.setCreatedAt(LocalDateTime.now());
        user = userRepository.save(user);
        return user;
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ItemNotFoundException("Can not find User with email: " + email));
        return this.convertToDto(user, UserResponse.class);
    }

    @Override
    public void updatePassword(String phoneNumber, String password) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new ItemNotFoundException("Can not find User with phone: " + phoneNumber));
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public Map<UserResponse, Integer> getUserOrderCountMap() {
        List<Object[]> results = userRepository.countOrdersByUserWithRole1();

        Map<UserResponse, Integer> userOrderCountMap = new HashMap<>();
        for (Object[] row : results) {
            User user = (User) row[0];
            Long count = (Long) row[1];
            UserResponse userResponse = this.convertToDto(user, UserResponse.class);
            userOrderCountMap.put(userResponse, count.intValue());
        }
        return userOrderCountMap;
    }


}

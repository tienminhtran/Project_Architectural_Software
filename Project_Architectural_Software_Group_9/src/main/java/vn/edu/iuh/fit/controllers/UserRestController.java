/**
 * @ (#) UserRestController.java      2/28/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.*;
import vn.edu.iuh.fit.exception.EmailAlreadyExistsException;
import vn.edu.iuh.fit.exception.MissingTokenException;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;
import vn.edu.iuh.fit.security.jwt.JwtTokenProvider;
import vn.edu.iuh.fit.services.CartService;
import vn.edu.iuh.fit.services.EmailService;
import vn.edu.iuh.fit.services.UserService;
import vn.edu.iuh.fit.utils.FormatPhoneNumber;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.*;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/28/2025
 */
@RestController
@RequestMapping("/api/v1/user")
public class UserRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtUtils;

    @Autowired
    private Validator validator;

    @Autowired
    private CartService cartService;
    @Autowired
    private EmailService emailService;

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<UserResponse>> getUserById(@PathVariable Long id) {
        UserResponse userResponse = userService.findById(id);
        if (userResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<UserResponse>builder().status("success").message("Get user by id success").response(userResponse).build());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            UserResponse response = userService.getCurrentUser(token);
            return ResponseEntity.ok(BaseResponse.builder()
                    .status("SUCCESS")
                    .message("Get current user success")
                    .response(response)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }


    @GetMapping("/information/{username}")
    public ResponseEntity<BaseResponse<UserResponse>> getUserByUsername(@PathVariable String username) {
        UserResponse userResponse = userService.getUserByUsername(username);
        if (userResponse == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<UserResponse>builder().status("success").message("Get user by username success").response(userResponse).build());
    }

    @GetMapping("/roles-user")
    public ResponseEntity<?> getRolesUserByToken(@RequestHeader("Authorization") String token) {
        try {
            Map<String, Object> response = userService.getRolesUserByToken(token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/createManager", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<?>> createManager(
            @RequestPart("user") String userJson,
            @RequestPart(value = "fileImage", required = false) MultipartFile fileImage,
            BindingResult bindingResult)
            throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException {


        // Chuyển user từ JSON String sang Object
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        UserRequest userRequest;
        try {
            userRequest = objectMapper.readValue(userJson, UserRequest.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON format: " + e.getMessage());
        }

        // Gán ảnh vào userRequest
        userRequest.setImage(fileImage);

        // Validate dữ liệu đầu vào
        userService.validation(userRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = bindingResult.getFieldErrors().stream()
                    .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));

            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Validation failed")
                    .response(errors)
                    .build());
        }

        // Gọi service để tạo user
        UserResponse userResponse = userService.createUserRoleManager(userRequest, bindingResult);

        // Create a cart for the user
        cartService.createCart(userResponse.getId());

        if (userResponse == null) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Failed to create manager")
                    .build());
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Create manager successfully")
                .response(userResponse)
                .build());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<BaseResponse<List<UserResponse>> > getAllUsers() {
        List<UserResponse> userResponses = userService.findAll();

        if (userResponses == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(BaseResponse.<List<UserResponse>>builder()
                .status("SUCCESS")
                .message("Get all users success")
                .response(userResponses).build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public ResponseEntity<BaseResponse<?>> getUsersByPage(@RequestParam(defaultValue = "0", required = false) Integer pageNo,
                                                                           @RequestParam(defaultValue = "10", required = false) Integer pageSize) {
        if (pageNo == null) {
            pageNo = 0;
        }
        if (pageSize == null) {
            pageSize = 5;
        }

        PageResponse<UserResponse> userResponses = userService.getUsersByPage(pageNo, pageSize);

        if (userResponses == null || userResponses.getValues().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Get users by page success")
                .response(userResponses).build());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/topCustomers")
    public ResponseEntity<BaseResponse<List<TopCustomerResponse>> > getTopCustomers(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false)LocalDate endDate ) {

        int year = LocalDate.now().getYear();
        if (startDate == null) {
            startDate = LocalDate.of(year, 1, 1);
        }
        if (endDate == null) {
            endDate = LocalDate.of(year, 12, 31);
        }

        List<TopCustomerResponse> topCustomerResponses = userService.getTopCustomers(startDate, endDate);

        if (topCustomerResponses == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<List<TopCustomerResponse>>builder()
                .status("SUCCESS")
                .message("Get top customers success")
                .response(topCustomerResponses).build());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/countByRoleUser")
    public ResponseEntity<BaseResponse<Integer>> countByRoleUser() {
        int count = userService.countByRoleUser();
        return ResponseEntity.ok(BaseResponse.<Integer>builder()
                .status("SUCCESS")
                .message("Count by role user success")
                .response(count).build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/countByRoleManager")
    public ResponseEntity<BaseResponse<Integer>> countByRoleManager() {
        int count = userService.countByRoleManager();
        return ResponseEntity.ok(BaseResponse.<Integer>builder()
                .status("SUCCESS")
                .message("Count by role manager success")
                .response(count).build());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse<?>> updateUser(
            @PathVariable Long id,
            @RequestPart("user") String userJson,
            @RequestPart(value = "fileImage", required = false) MultipartFile fileImages,
            BindingResult bindingResult) throws EmailAlreadyExistsException, UserAlreadyExistsException, MethodArgumentNotValidException {

        System.out.println("id: " + id);
        System.out.println("fileImage: " + fileImages);
        System.out.println("userJson: " + userJson);
        // Chuyen string sang json
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        UserRequest userRequest;
        try {
            userRequest = objectMapper.readValue(userJson, UserRequest.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        UserResponse userResponse = userService.findById(id);

        // bỏ qua check username
        if(userResponse.getUsername().equals(userRequest.getUsername())) {
            userRequest.setUsername(UUID.randomUUID().toString());
            userRequest.setConfirmPassword(userRequest.getPassword());
        }

        if(userResponse.getEmail().equals(userRequest.getEmail())) {
            userRequest.setEmail("example@gmail.com");
        }

        if(userResponse.getPhoneNumber().equals(userRequest.getPhoneNumber())) {
            userRequest.setPhoneNumber("0123456789");
        }

        userService.validation(userRequest, bindingResult);
        //validation userRequest
        Set<ConstraintViolation<UserRequest>> violations = validator.validate(userRequest);
        if(!violations.isEmpty()) {
            Map<String, Object> errors = new HashMap<>();
            violations.forEach(violation -> {
                errors.put(violation.getPropertyPath().toString(), violation.getMessage());
            });
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("FAILED")
                    .message("Validation error")
                    .response(errors)
                    .build());
        }

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new HashMap<String, Object>();

            bindingResult.getFieldErrors().stream().forEach(result -> {
                errors.put(result.getField(), result.getDefaultMessage());
            });

            System.out.println(bindingResult);
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("FAILED")
                    .message("Validation error")
                    .response(errors)
                    .build());
        }

        userRequest.setImage(fileImages);
        UserResponse newUser = userService.updateUser(id,userRequest);

        if (newUser == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Update user success")
                .response(newUser)
                .build());
    }

    @PostMapping("/reset-password")
    public ResponseEntity<BaseResponse<?>> resetPassword(@RequestBody Map<String, String> request) throws MissingTokenException {
        String idToken = request.get("idToken");
        String newPassword = request.get("newPassword");

        if (idToken == null || idToken.isEmpty()) {
            throw new MissingTokenException("Thiếu ID Token trong request!");
        }

        if (newPassword == null || newPassword.length() < 8) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Mật khẩu mới phải có ít nhất 8 ký tự!")
                    .build());
        }

        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            System.out.println("Decoded Token: " + decodedToken.getClaims());
            String phoneNumber = decodedToken.getClaims().get("phone_number").toString();
            phoneNumber= FormatPhoneNumber.formatPhoneNumberTo0(phoneNumber);


            // Kiểm tra xem số điện thoại đã tồn tại chưa
            if (!userService.existsPhone(phoneNumber)) {
                return ResponseEntity.badRequest().body(BaseResponse.builder()
                        .status("ERROR")
                        .message("Số điện thoại không tồn tại!")
                        .build());
            }

            // Cập nhật mật khẩu
            userService.updatePassword(phoneNumber, newPassword);

            return ResponseEntity.ok(BaseResponse.builder()
                    .status("SUCCESS")
                    .message("Đặt lại mật khẩu thành công cho số điện thoại: " + phoneNumber)
                    .build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Đặt lại mật khẩu thất bại: " + e.getMessage())
                    .build());
        }
    }

    @PostMapping("/check-phone")
    public ResponseEntity<Map<String, Boolean>> checkPhone(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        if (phone == null || phone.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        boolean exists = userService.existsPhone(phone);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/allUserHasOrder")
//    public ResponseEntity<BaseResponse<Map<UserResponse, Integer>>> getAllUserHasOrder() {
//        Map<UserResponse, Integer> map = userService.getUserOrderCountMap();
//        if (map.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(BaseResponse.<Map<UserResponse, Integer>>builder()
//                .status("SUCCESS")
//                .message("Get all users with orders success")
//                .response(map)
//                .build());
//    }

    @GetMapping("/allUserHasOrder")
    public ResponseEntity<BaseResponse<List<UserResponse>>> getAllUserHasOrder() {
        List<UserResponse> list = userService.getUserOrderCountList();

        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(BaseResponse.<List<UserResponse>>builder()
                .status("SUCCESS")
                .message("Get all users with orders success")
                .response(list)
                .build());
    }


    // lay danh sach user có role = 1
    @GetMapping("/allUserRole1")
    public ResponseEntity<BaseResponse<List<UserResponse>>> getAllUserRole1() {
        List<UserResponse> userResponses = userService.getAllUserRole1();
        if (userResponses == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<List<UserResponse>>builder()
                .status("SUCCESS")
                .message("Get all users with role 1 success")
                .response(userResponses).build());
    }

    // lay danh sach user có role = 1 và chưa có order
    @GetMapping("/allUserRole1AndNoOrder")
    public ResponseEntity<BaseResponse<List<UserResponse>>> getAllUserRole1AndNoOrder() {
        List<UserResponse> userResponses = userService.getAllUserRole1AndNoOrder();
        if (userResponses == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.<List<UserResponse>>builder()
                .status("SUCCESS")
                .message("Get all users with role 1 and no order success")
                .response(userResponses).build());
    }

//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping("/updateStatus")
//    public ResponseEntity<BaseResponse<?>> updateStatus(@RequestBody List<Long> ids) {
//        if (ids == null || ids.isEmpty()) {
//            return ResponseEntity.badRequest().body(BaseResponse.builder()
//                    .status("ERROR")
//                    .message("List of user IDs cannot be null or empty")
//                    .build());
//        }
//
//        userService.updateStatusByIds(ids);
//
//        return ResponseEntity.ok(BaseResponse.builder()
//                .status("SUCCESS")
//                .message("Update status success")
//                .build());
//    }

    @PutMapping("/updateStatus/{ids}")
    public ResponseEntity<BaseResponse<?>> updateStatus(@PathVariable List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("List of user IDs cannot be null or empty")
                    .build());
        }

        userService.updateStatusByIds(ids);

        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Update status success")
                .build());
    }

    // TEST POST MAIN: localhost:8080/api/v1/user/updateStatus

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/notify")
    public ResponseEntity<?> notifyUser(@RequestParam(name = "email") String email, @RequestParam(name="nameuser" ) String nameuser)
                                       {
        try {
            emailService.sendEmailNotification(nameuser, email);
            return ResponseEntity.ok(BaseResponse.builder()
                    .status("SUCCESS")
                    .message("Send email notification success")
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Send email notification failed: " + e.getMessage())
                    .build());
        }
    }



    // update ngay goi mail thong bao theo userid
    @PutMapping("/emailNotificationDate/{id}")
    public ResponseEntity<BaseResponse<?>> updateEmailNotificationDate(@PathVariable Long id) {
        UserResponse userResponse = userService.findById(id);
        if (userResponse == null) {
            return ResponseEntity.notFound().build();
        }
        // Cập nhật ngày gửi email thông báo
        userResponse.setEmailNotificationDate(LocalDateTime.now());
        return ResponseEntity.ok(BaseResponse.builder()
                .status("SUCCESS")
                .message("Update email notification date success")
                .build());
    }

    // test postmain: localhost:8080/api/v1/user/emailNotificationDate/1

}

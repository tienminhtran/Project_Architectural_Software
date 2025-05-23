/**
 * @ (#) UserService.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import vn.edu.iuh.fit.dtos.request.UserRequest;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.TopCustomerResponse;
import vn.edu.iuh.fit.dtos.response.UserResponse;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.exception.EmailAlreadyExistsException;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
public interface UserService {
    UserResponse getUserByUsername(String username);

    Map<String, Object> getRolesUserByToken(String token);
    UserResponse getCurrentUser(String token);

    UserResponse createUser(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException;



    public UserResponse updateUser(Long id, UserRequest userRequest);

    public void validation(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException;

    public UserResponse findById(Long id);



    boolean existsUsername(String username);

    boolean existsEmail(String email);

    boolean existsPhone(String email);

    UserResponse findByUsername(String username);

    UserResponse createUserRoleManager(UserRequest userRequest, BindingResult result) throws UserAlreadyExistsException, EmailAlreadyExistsException, MethodArgumentNotValidException;

    List<UserResponse> findAll();

    PageResponse<UserResponse> getUsersByPage(int pageNo, int pageSize);

    List<TopCustomerResponse> getTopCustomers(LocalDate startDate, LocalDate endDate);

    int countByRoleUser();

    int countByRoleManager();

    UserResponse updateUserInfo(Long userId, UserRequest userRequest);

    boolean verifyAccount(String email,String token);

    User createGoogleUser(String email, String name, String imageUrl);

    UserResponse getUserByEmail(String email);

    void updatePassword(String phoneNumber, String password);

    // lấy danh sách người dùng và so oder
//    public Map<UserResponse, Integer> getUserOrderCountMap() ;

    // lay danh sach user có role = 1
    public List<UserResponse> getAllUserRole1();
    List<UserResponse> getUserOrderCountList();
    // lay danh sach user có role = 1 và chưa có order
    public List<UserResponse> getAllUserRole1AndNoOrder();

    // update status = false list user theo iduser
    boolean updateStatusByIds(List<Long> ids);


    // update ngay goi email thong bao la ngay gio hien tai theo iduser

    void updateEmailNotificationDateById(Long id);

    //findUsersWithEmailNotificationDate10DaysAgo
    List<UserResponse> findUsersWithEmailNotificationDate10DaysAgo();
}

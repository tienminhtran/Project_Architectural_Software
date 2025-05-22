/**
 * @ (#) EmailService.java      4/13/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import vn.edu.iuh.fit.exception.SendEmailException;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/13/2025
 */
public interface EmailService {
    void sendEmailToVerifyAccount(String name, String to, String token) throws SendEmailException;
    void sendEmailNotification(Long id, String to) throws SendEmailException;

}

/**
 * @ (#) EmailServiceImpl.java      4/13/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.exception.SendEmailException;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.services.EmailService;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/13/2025
 */
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private  JavaMailSender mailSender;

    @Value("${spring.mail.verify.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendEmailToVerifyAccount(String nameCustomer, String toEmail, String token) throws SendEmailException {
        String messageContent = "Hello " + nameCustomer + ",\n\n" +
                "Thank you for registering! Please click the link below to verify your email address::\n" +
                "[Verify Email] "+ host + "/api/v1/auth/verify?email="+toEmail+"&token=" + token + "\n\n" +
                "If you didn’t sign up, please ignore this email. Thank you,\n" +
                "Best,\n" +
                "The Support Team";
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("New User Account Verification");
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setText(messageContent);
            mailSender.send(message);

        } catch (Exception e) {
            throw new SendEmailException("Has error occurred while sending email to verify account\n\n"
                    + e.getMessage());
        }

    }
}

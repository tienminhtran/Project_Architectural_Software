/**
 * @ (#) EmailServiceImpl.java      4/13/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.exception.ItemNotFoundException;
import vn.edu.iuh.fit.exception.SendEmailException;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.services.EmailService;

import java.time.LocalDateTime;

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

    @Autowired
    private UserRepository userRepository;

    @Override
    public void sendEmailToVerifyAccount(String nameCustomer, String toEmail, String token) throws SendEmailException {
        String messageContent = "Hello " + nameCustomer + ",\n\n" +
                "Thank you for registering! Please click the link below to verify your email address::\n" +
                "[Verify Email] "+ host + "/api/v1/auth/verify?email="+toEmail+"&token=" + token + "\n\n" +
                "If you didn’t sign up, please ignore this email. Thank you,\n" +
                "Best,\n" +
                "eTraDe Support Team";
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

    @Override
    public void sendEmailNotification(Long id, String to) throws SendEmailException {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("Can not find User with id: " + id));

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            // true = multipart message
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setSubject("Thông báo kích hoạt tài khoản eTraDe");
            helper.setFrom(fromEmail);
            helper.setTo(to);

            // Nội dung email HTML, bạn có thể chỉnh sửa theo ý muốn
            String htmlMsg = "<html><body>" +
                    "<p>Hello <b>" + user.getLastname() + " " + user.getFirstname() + "</b>,</p>" +
                    "<p>Thank you for registering an account on <a href='https://tranminhtien.io.vn'>eTraDe</a>!</p>" +
                    "<p><b>Your account on eTraDe will be <span style='color:red;'>locked after 10 days</span></b>, from the date of sending this email if you do not complete the verification or account activation process.</p>" +
                    "<p>If you did not make a <b>PURCHASE</b>, please ignore this email.</p>" +
                    "<br>" +
                    "<p>Sincerely,<br>eTraDe Support Team</p>" +

                    // Add image logo (link from web or send inline)
                    "<img src='https://tranminhtien.io.vn/images/logo/logo-large.png' alt='Logo eTraDe' style='width:150px;'/>" +

                    "</body></html>";

            helper.setText(htmlMsg, true); // true = gửi dưới dạng HTML
            user.setEmailNotificationDate(LocalDateTime.now());
            userRepository.save(user);

            // cmt dong nay de hong goi mail
            mailSender.send(mimeMessage);



        } catch (Exception e) {
            throw new SendEmailException("Đã xảy ra lỗi khi gửi email thông báo:\n\n" + e.getMessage());
        }
    }

}

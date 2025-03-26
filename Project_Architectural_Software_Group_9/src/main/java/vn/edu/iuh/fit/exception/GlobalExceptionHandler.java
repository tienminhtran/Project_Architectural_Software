/**
 * @ (#) GlobalExceptionHandler.java      2/16/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import vn.edu.iuh.fit.dtos.response.BaseResponse;

import java.util.*;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/16/2025
 */
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ItemNotFoundException.class)
    public ResponseEntity<Map<String, Object>> userNotFoundException(ItemNotFoundException ex) {
        Map<String, Object> errors = new LinkedHashMap<String, Object>();
        errors.put("status", HttpStatus.NOT_FOUND.value());
        errors.put("message", " ----- " + ex.getMessage());
        return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse<?>> globalExceptionHandler(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        BaseResponse.builder()
                                .status("FAILED")
                                .message(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<BaseResponse<?>> userAlreadyExistsExceptionHandler(UserAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        BaseResponse.builder()
                                .status("FAILED")
                                .message(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<BaseResponse<?>> emailAlreadyExistsExceptionHandler(EmailAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        BaseResponse.builder()
                                .status("FAILED")
                                .message(ex.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(CustomJwtException.class)
    public ResponseEntity<BaseResponse<?>> jwtExceptionHandler(CustomJwtException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        BaseResponse.builder()
                                .status("FAILED")
                                .message(ex.getMessage())
                                .build()
                );
    }

}

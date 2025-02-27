/**
 * @ (#) GlobalExceptionHandler.java      2/16/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.LinkedHashMap;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/16/2025
 */
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ItemNotFoundException.class)
    public ResponseEntity<Map<String, Object>> userNotFoundException(ItemNotFoundException ex) {
        Map<String, Object> errors = new LinkedHashMap<String, Object>();
        errors.put("status", HttpStatus.NOT_FOUND.value());
        errors.put("message", " ----- " + ex.getMessage());
        return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> globalExceptionHandler(Exception ex) {
        Map<String, Object> errors = new LinkedHashMap<String, Object>();
        errors.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        errors.put("message", ex.getMessage());
        return new ResponseEntity<Map<String, Object>>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
    }



}

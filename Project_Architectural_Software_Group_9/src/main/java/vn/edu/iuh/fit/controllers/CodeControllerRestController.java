package vn.edu.iuh.fit.controllers;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:54 AM
 * @nameProject: Project_Architectural_Software
 */

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dtos.request.CodeControllerRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.services.CodeControllerService;

@RestController
@RequestMapping("/api/v1/code")
public class CodeControllerRestController {

    @Autowired
    private CodeControllerService codeControllerService;


        /**
     * * Create a new CodeController chi tao 1 cac thuoc tinh:
     * ngay tao ngay hien tai date_create
     * life_cycle: 3 phut
     *
     */

    @PostMapping("")
    public ResponseEntity<BaseResponse<?>> createCodeController(@Valid @RequestBody CodeControllerRequest codeControllerRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .status("ERROR")
                    .message("Invalid request")
                    .response(bindingResult.getFieldErrors())
                    .build());
        }
        try {
            return ResponseEntity.ok(BaseResponse.builder()
                    .status("SUCCESS")
                    .message("Create CodeController success")
                    .response(codeControllerService.createCodeController(codeControllerRequest))
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(BaseResponse.builder()
                    .status("ERROR")
                    .message(e.getMessage())
                    .build());
        }
    }
}

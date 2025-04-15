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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dtos.request.CodeControllerRequest;
import vn.edu.iuh.fit.dtos.response.BaseResponse;
import vn.edu.iuh.fit.dtos.response.CodeControllerResponse;
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
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")

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

    /**
     * getall
     */
    @GetMapping("/all")
    public ResponseEntity<BaseResponse<?>> getAllCodeController() {
        try {
            return ResponseEntity.ok(BaseResponse.builder()
                    .status("SUCCESS")
                    .message("Get all CodeController success")
                    .response(codeControllerService.findAll())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(BaseResponse.builder()
                    .status("ERROR")
                    .message(e.getMessage())
                    .build());
        }
    }

    /**
     *
     * @param ma_code
     * @return
     */
    @PreAuthorize("hasAnyRole('MANAGER')")
    @DeleteMapping("/{ma_code}")
    public ResponseEntity<BaseResponse<?>> updateCodeController(@PathVariable String ma_code){
        boolean isUpdated = codeControllerService.deleteById(ma_code);
        if (!isUpdated) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Update voucher success").build());

    }


    @GetMapping("/{ma_code}")
    public ResponseEntity<BaseResponse<?>> getCodeByID(@PathVariable String ma_code) {
        Object code = codeControllerService.findById(ma_code);
        if (code == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(BaseResponse.builder().status("SUCCESS").message("Get voucher by id success").response(code).build());
    }


}

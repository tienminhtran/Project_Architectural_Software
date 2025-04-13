package vn.edu.iuh.fit.services.impl;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:43 AM
 * @nameProject: Project_Architectural_Software
 */

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.CodeControllerRequest;
import vn.edu.iuh.fit.dtos.response.CodeControllerResponse;
import vn.edu.iuh.fit.entities.CodeController;
import vn.edu.iuh.fit.repositories.CodeControllerRepository;
import vn.edu.iuh.fit.services.CodeControllerService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class CodeControllerServiceImpl implements CodeControllerService {

    @Autowired
    CodeControllerRepository codeControllerRepository;

    @Autowired
    private ModelMapper modelMapper;


    private CodeControllerResponse convertToDto(CodeController CodeController) {
        return modelMapper.map(CodeController, CodeControllerResponse.class);
    }

    private CodeController convertToEntity(CodeControllerRequest codeControllerRequest) {
        return modelMapper.map(codeControllerRequest, CodeController.class);
    }
    /**
     * * Create a new CodeController chi tao 1 cac thuoc tinh:
     * ngay tao ngay hien tai date_create
     * life_cycle: 3 phut
     *
     */
    @Override
    public CodeControllerResponse createCodeController(CodeControllerRequest request) throws Exception {
        // Tạo đối tượng CodeController
        CodeController code = new CodeController();

        // Set thông tin ID, nếu không có sẽ sử dụng Auto Increment
        code.setId(request.getId());  // ID có thể bỏ nếu để AUTO_INCREMENT
        code.setActive(request.isActive());  // Lấy thông tin active từ client

        // Lấy thời gian hiện tại và chuyển thành chuỗi ISO 8601
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        code.setDate_create(now.format(formatter));  // Lưu thời gian hiện tại vào date_create

        // Đặt vòng đời là 180 giây (3 phút)
        code.setLife_cycle(180);

        // Lưu đối tượng vào cơ sở dữ liệu
        CodeController saved = codeControllerRepository.save(code);

        // Kiểm tra nếu lưu thành công
        if (saved != null) {
            return convertToDto(saved);
        } else {
            throw new Exception("CodeController not created");
        }
    }
}

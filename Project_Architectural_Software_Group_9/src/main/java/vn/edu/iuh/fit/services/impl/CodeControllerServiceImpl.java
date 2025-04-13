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

        // Set các thuộc tính từ request
        code.setId(request.getId());
        code.setCode(request.getCode()); // Sử dụng mã code người dùng nhập
        code.setActive(request.isActive());

        // Lấy thời gian hiện tại
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        code.setDate_create(now.format(formatter));

        // Đặt vòng đời là 180 giây (3 phút)
        code.setLife_cycle(180);

        // Lưu đối tượng vào CSDL
        CodeController saved = codeControllerRepository.save(code);

        if (saved != null) {
            return convertToDto(saved);
        } else {
            throw new Exception("CodeController not created");
        }
    }

//    public CodeControllerResponse createCodeController(CodeControllerRequest request) throws Exception {
//        // Tạo đối tượng CodeController
//        CodeController code = new CodeController();
//
//        // Set ID nếu có (nếu để AUTO_INCREMENT thì bỏ dòng dưới)
//        code.setId(request.getId());
//
//        // Mặc định là active = true khi tạo mới
//        code.setActive(true);
//
//        // Lấy thời gian hiện tại
//        LocalDateTime now = LocalDateTime.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
//        code.setDate_create(now.format(formatter));
//
//        // Đặt vòng đời là 180 giây (3 phút)
//        code.setLife_cycle(180);
//
//        // Sinh ngẫu nhiên 6 chữ số cho mã code
//        String randomCode = String.format("%06d", (int) (Math.random() * 1000000));
//        code.setCode(randomCode);
//
//        // Lưu đối tượng vào CSDL
//        CodeController saved = codeControllerRepository.save(code);
//
//        if (saved != null) {
//            return convertToDto(saved);
//        } else {
//            throw new Exception("CodeController not created");
//        }
//    }
}

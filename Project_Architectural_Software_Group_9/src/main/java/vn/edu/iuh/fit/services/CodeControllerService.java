package vn.edu.iuh.fit.services;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:33 AM
 * @nameProject: Project_Architectural_Software
 */
import java.util.List;
import java.util.Optional;

import vn.edu.iuh.fit.dtos.request.CodeControllerRequest;
import vn.edu.iuh.fit.dtos.response.CodeControllerResponse;

public interface CodeControllerService {
    CodeControllerResponse createCodeController(CodeControllerRequest codeControllerRequest) throws Exception;

    List<CodeControllerResponse> findAll();

    CodeControllerResponse updateCodeController(String ma_code, CodeControllerRequest codeControllerRequest);
    Optional<CodeControllerResponse> findById(String ma_code);

    boolean deleteById(String id);

}

package vn.edu.iuh.fit.services;/*
 * @description:
 * @author: TienMinhTran
 * @date: 13/4/2025
 * @time: 9:33 AM
 * @nameProject: Project_Architectural_Software
 */

import vn.edu.iuh.fit.dtos.request.CodeControllerRequest;
import vn.edu.iuh.fit.dtos.response.CodeControllerResponse;

public interface CodeControllerService {

    CodeControllerResponse createCodeController(CodeControllerRequest codeControllerRequest) throws Exception;
}

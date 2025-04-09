package vn.edu.iuh.fit.services;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:51 AM
 * @nameProject: Project_Architectural_Software
 */

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.BrandRequest;
import vn.edu.iuh.fit.dtos.response.BrandResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.entities.Brand;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface BrandService {
    List<BrandResponse> getAllBrands();

    Optional<BrandResponse> findById(Long id);

    PageResponse<BrandResponse> getBrandsByPage(int pageNo, int pageSize);

    BrandResponse save(BrandRequest brandRequest);

    BrandResponse update(BrandRequest brandRequest, Long id);

    boolean delete(Long id);

    boolean existsBrand(String name);

    PageResponse<BrandResponse> searchBrand(String keyword, int pageNo, int pageSize);
}

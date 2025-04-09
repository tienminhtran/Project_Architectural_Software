package vn.edu.iuh.fit.services.impl;/*
 * @description:
 * @author: TienMinhTran
 * @date: 5/3/2025
 * @time: 9:50 AM
 * @nameProject: Project_Architectural_Software
 */

import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.BrandRequest;
import vn.edu.iuh.fit.dtos.response.BrandResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.entities.Brand;
import vn.edu.iuh.fit.repositories.BrandRepository;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.services.BrandService;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    BrandRepository brandRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;


    private BrandResponse convertToDto(Brand brand) {
        return modelMapper.map(brand, BrandResponse.class);
    }

    private Brand convertToEntity(BrandRequest brandRequest) {
        return modelMapper.map(brandRequest, Brand.class);
    }

    // Kiểm tra hình ảnh có phải là hình ảnh hợp lệ không (có phải là hình ảnh có đuôi mở rộng là .jpg, .png, .jpeg, .gif, .bmp không)
    private boolean isValidSuffixImage(String img) {
        return img.endsWith(".jpg") || img.endsWith(".png") || img.endsWith(".jpeg")
                || img.endsWith(".gif") || img.endsWith(".bmp");
    }

    public String saveFile(MultipartFile file) throws IOException {
        String uploadDir = "./uploads";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        try {
            String fileName = file.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            Files.copy(file.getInputStream(), Paths.get(uploadDir, uniqueFileName), StandardCopyOption.REPLACE_EXISTING);
            return uniqueFileName;
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new BadRequestException("File already exists");
            }
            throw new RuntimeException(e.getMessage());
        }
    }


    @Override
    public List<BrandResponse> getAllBrands() {
        List<Brand> brands = brandRepository.findAll();
        if (brands != null) {
            return brands.stream().map(this::convertToDto).toList();
        }
        return null;
    }

    @Override
    public Optional<BrandResponse> findById(Long id) {
        Optional<Brand> brand = brandRepository.findBrandById(id);
        return brand.map(this::convertToDto);
    }

    @Override
    public PageResponse<BrandResponse> getBrandsByPage(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Brand> brands = brandRepository.findAll(pageable);
        PageResponse<BrandResponse> pageDto = new PageResponse<>();
        if (brands != null) {
            pageDto.setPage(pageNo);
            pageDto.setSize(pageSize);
            pageDto.setTotal(brands.getNumberOfElements());
            pageDto.setTotalPages(brands.getTotalPages());
            pageDto.setValues(brands.stream().map(this::convertToDto).toList());
        }
        return pageDto;
    }

    @Override
    public BrandResponse save(BrandRequest brandRequest) {
        try {
            List<MultipartFile> fileImage = brandRequest.getBrandImg();
            String brandImg = "default-brand.jpg";
            if (fileImage != null && !fileImage.isEmpty()) {
                MultipartFile multipartFile = fileImage.get(0);
                if (!isValidSuffixImage(Objects.requireNonNull(multipartFile.getOriginalFilename()))) {
                    throw new BadRequestException("Invalid image suffix");
                }
                brandImg = saveFile(multipartFile);
            }
            Brand brand = Brand.builder()
                    .name(brandRequest.getName())
                    .brandImg(brandImg)
                    .active(true)
                    .build();
            brand = brandRepository.save(brand);
            return this.convertToDto(brand);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public BrandResponse update(BrandRequest brandRequest, Long id) {
        Brand brand = brandRepository.findById(id).orElseThrow(() -> new RuntimeException("Brand not found"));
        try {
            List<MultipartFile> fileImage = brandRequest.getBrandImg();
            String brandImg = brand.getBrandImg();
            if (fileImage != null && !fileImage.isEmpty()) {
                MultipartFile multipartFile = fileImage.get(0);
                if (!isValidSuffixImage(Objects.requireNonNull(multipartFile.getOriginalFilename()))) {
                    throw new BadRequestException("Invalid image suffix");
                }
                brandImg = saveFile(multipartFile);
            }
            brand.setName(brandRequest.getName());
            brand.setBrandImg(brandImg);
            brand = brandRepository.save(brand);
            return this.convertToDto(brand);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public boolean delete(Long id) {
        Optional<Brand> brand = brandRepository.findById(id);
        if (brand.isPresent()) {
            brand.get().setActive(false);
            brandRepository.save(brand.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean existsBrand(String name) {
        Optional<Brand> brand = brandRepository.findByName(name);
        if (brand.isPresent()) {
            return true;
        }
        return false;
    }

    @Override
    public PageResponse<BrandResponse> searchBrand(String keyword, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Brand> brands = brandRepository.searchBrand(keyword, pageable);
        PageResponse<BrandResponse> response = new PageResponse<>();
        if (brands != null) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(brands.getNumberOfElements());
            response.setTotalPages(brands.getTotalPages());
            response.setValues(brands.stream().map(this::convertToDto).toList());
        }
        return response;
    }
}

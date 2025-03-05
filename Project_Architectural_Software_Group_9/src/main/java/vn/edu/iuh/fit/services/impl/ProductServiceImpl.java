/**
 * @ (#) ProductServiceImpl.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;
import vn.edu.iuh.fit.entities.Brand;
import vn.edu.iuh.fit.entities.Category;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.repositories.BrandRepository;
import vn.edu.iuh.fit.repositories.CategoryRepository;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.services.ProductService;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;


    private final Path root = Paths.get("./uploads");
    @Autowired
    private BrandRepository brandRepository;


    //entity to dto
    // Phương thức chuyển đổi User sang DTO với kiểu generic T
    private <T> T convertToDto(Product product, Class<T> targetClass) {
        return modelMapper.map(product, targetClass);
    }

    // Phương thức chuyển đổi DTO sang User với kiểu generic T
    private <T> Product convertToEntity(T tDto, Class<T> dtoClass) {
        return modelMapper.map(tDto, Product.class);
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> this.convertToDto(product, ProductResponse.class)).toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return this.convertToDto(product, ProductResponse.class);
    }

    @Override
    public PageResponse<ProductResponse> getProductsByPage(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Product> products = productRepository.findAll(pageable);
        PageResponse<ProductResponse> pageDto = new PageResponse<>();
        if (products != null) {
            pageDto.setPage(pageNo);
            pageDto.setSize(pageSize);
            pageDto.setTotal(products.getNumberOfElements());
            pageDto.setTotalPages(products.getTotalPages());
            pageDto.setValues(products.stream().map(product -> this.convertToDto(product, ProductResponse.class)).toList());
        }
        return pageDto;
    }

    public String saveImage(MultipartFile file) {
        try {
            // get file name
            String fileName = file.getOriginalFilename();
            // generate code random base on UUID
            String uniqueFileName = UUID.randomUUID().toString() + "_" + LocalDate.now() + "_" + fileName;
            Files.copy(file.getInputStream(), this.root.resolve(uniqueFileName), StandardCopyOption.REPLACE_EXISTING);
            return uniqueFileName;
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("Filename already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    private boolean isValidSuffixImage(String img) {
        return img.endsWith(".jpg") || img.endsWith(".jpeg") ||
                img.endsWith(".png") || img.endsWith(".gif") ||
                img.endsWith(".bmp");
    }


    /**
     * Save product
     *
     * @param productRequest
     * @return product
     */
    @Override
    public boolean createProduct(ProductRequest productRequest, MultipartFile file) throws IOException {
        Category categoryExisting = categoryRepository.findById(productRequest.getCategoryId()).get();
        Brand brand = brandRepository.findById(productRequest.getBrandId()).get();
        try {
            String thumbnail = "";
            if (file == null) {
                thumbnail = "default-product.jpg";
            } else {
                if (!isValidSuffixImage(Objects.requireNonNull(file.getOriginalFilename()))) {
                    throw new BadRequestException("Image is not valid");
                }
                thumbnail = saveImage(file);
            }
            Product product = Product.builder()
                    .productName(productRequest.getName())
                    .description(productRequest.getDescription())
                    .price(productRequest.getPrice())
                    .cpu(productRequest.getCpu())
                    .ram(productRequest.getRam())
                    .os(productRequest.getOs())
                    .monitor(productRequest.getMonitor())
                    .battery(productRequest.getBattery())
                    .graphicCard(productRequest.getGraphicCard())
                    .port(productRequest.getPort())
                    .rearCamera(productRequest.getRearCamera())
                    .frontCamera(productRequest.getFrontCamera())
                    .stockQuantity(productRequest.getStockQuantity())
                    .warranty(productRequest.getWarranty())
                    .weight(productRequest.getWeight())
                    .thumbnail(thumbnail)
                    .category(categoryExisting)
                    .brand(brand)
                    .build();
            productRepository.save(product);
            return true;
        } catch (IOException ioe) {
            throw new IOException("Cannot create product" + ioe.getMessage());
        }
    }

}

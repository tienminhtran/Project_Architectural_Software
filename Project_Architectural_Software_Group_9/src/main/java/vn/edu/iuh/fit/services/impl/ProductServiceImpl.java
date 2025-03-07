/**
 * @ (#) ProductServiceImpl.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.iuh.fit.dtos.request.ProductRequest;
import vn.edu.iuh.fit.dtos.response.BestSellingProductResponse;
import vn.edu.iuh.fit.dtos.response.PageResponse;
import vn.edu.iuh.fit.dtos.response.ProductResponse;
import vn.edu.iuh.fit.entities.Brand;
import vn.edu.iuh.fit.entities.Category;
import vn.edu.iuh.fit.entities.Product;
import vn.edu.iuh.fit.repositories.BrandRepository;
import vn.edu.iuh.fit.repositories.CategoryRepository;
import vn.edu.iuh.fit.repositories.OrderDetailRepository;
import vn.edu.iuh.fit.repositories.ProductRepository;
import vn.edu.iuh.fit.services.ProductService;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

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

    @Autowired
    private OrderDetailRepository orderDetailRepository;


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

    /**
     * total product
     * @return int
     */
    @Query("SELECT COUNT(p) FROM Product p")
    @Override
    public int countProducts() {
        return (int) productRepository.count();
    }


    /**
     * total stock quantity
     * @return int
     */
    @Override
    public int getTotalStockQuantity() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .mapToInt(Product::getStockQuantity)
                .sum();
    }


    @Override
    public boolean existsProduct(String name) {
//        Optional<Product> product = productRepository.findByName(name);
//        if (product.isPresent()) {
//            return true;
//        }
        return false;
    }


    @Override
    public ProductResponse createProduct(ProductRequest productRequest) {
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Category not found"));
        Brand brand = brandRepository.findById(productRequest.getBrandId()).orElseThrow(() -> new IllegalArgumentException("Brand not found"));
        try {

            List<MultipartFile> fileImage = productRequest.getFileImage();
            String thumbnail = "default-product.jpg";
            Set<String> images = new HashSet<>();

            if (fileImage != null && !fileImage.isEmpty()) { // check if file image is not null and not empty
                MultipartFile firstImage = fileImage.get(0); // get first image
                if (!isValidSuffixImage(Objects.requireNonNull(firstImage.getOriginalFilename()))) {
                    throw new BadRequestException("Image is not valid");
                }
                // Handel thumbnail product
                thumbnail = saveFile(firstImage);

                //Handel images product
                for(MultipartFile file: fileImage) {
                    if (!isValidSuffixImage(Objects.requireNonNull(file.getOriginalFilename()))) {
                        throw new BadRequestException("Image is not valid");
                    }
                    // function saveFile convert to type String -> add hashset images
                    images.add(saveFile(file));
                }

            }

            // create product
            Product product = Product.builder()
                    .productName(productRequest.getName())
                    .price(productRequest.getPrice())
                    .stockQuantity(productRequest.getStockQuantity())
                    .description(productRequest.getDescription())
                    .cpu(productRequest.getCpu())
                    .ram(productRequest.getRam())
                    .os(productRequest.getOs())
                    .monitor(productRequest.getMonitor())
                    .weight(productRequest.getWeight())
                    .battery(productRequest.getBattery())
                    .graphicCard(productRequest.getGraphicCard())
                    .port(productRequest.getPort())
                    .rearCamera(productRequest.getRearCamera())
                    .frontCamera(productRequest.getFrontCamera())
                    .warranty(productRequest.getWarranty())
                    .category(category)
                    .brand(brand)
                    .thumbnail(thumbnail)
                    .images(images)
                    .build();
            product = productRepository.save(product);
           return this.convertToDto(product, ProductResponse.class);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private boolean isValidSuffixImage(String img) {
        return img.endsWith(".jpg") || img.endsWith(".jpeg") ||
                img.endsWith(".png") || img.endsWith(".gif") ||
                img.endsWith(".bmp");
    }

    public String saveFile(MultipartFile file) throws IOException {
        // khi nao lam fe upload file thi dung
//        String uploadDir = "./uploads";
//        Path uploadPath = Paths.get(uploadDir);
//        if (!Files.exists(uploadPath)) {
//            Files.createDirectories(uploadPath);
//        }

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

    public List<BestSellingProductResponse> getBestSellingProducts(LocalDate startDate, LocalDate endDate) {
        // Lấy thời gian bắt đầu
        LocalDateTime startDateTime = startDate.atStartOfDay();
        // Lấy thời gian kết thúc
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);
        return orderDetailRepository.findBestSellingProducts(startDateTime, endDateTime);
    }
}

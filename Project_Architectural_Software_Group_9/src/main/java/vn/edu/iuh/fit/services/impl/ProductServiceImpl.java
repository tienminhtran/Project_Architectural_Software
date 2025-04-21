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
import java.util.stream.Collectors;

import static vn.edu.iuh.fit.utils.ImageUtil.isValidSuffixImage;
import static vn.edu.iuh.fit.utils.ImageUtil.saveFile;

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
     *
     * @return int
     */
    @Query("SELECT COUNT(p) FROM Product p")
    @Override
    public int countProducts() {
        return (int) productRepository.count();
    }

    @Override
    public PageResponse<ProductResponse> searchProduct(String keyword, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Product> products = productRepository.searchProduct(keyword, pageable);

        PageResponse<ProductResponse> response = new PageResponse<>();
        if(products != null) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setPage(products.getNumberOfElements());
            response.setTotal(products.getTotalPages());
            response.setValues(products.stream().map(product -> this.convertToDto(product, ProductResponse.class)).collect(Collectors.toList()));
        }
        return response;
    }

    @Override
    public boolean deleteProduct(Long id) {
        Optional<Product> p = productRepository.findById(id);
        if(p.isPresent()){
            p.get().setStockQuantity(0);
            productRepository.save(p.get());
            return true;
        }
        return false;

    }

    @Override
    public List<ProductResponse> filterProductLaptop() {
        List<Product> products = productRepository.findByCategory_Name("Computer");
        return products.stream().map(product -> this.convertToDto(product, ProductResponse.class)).toList();
    }

    @Override
    public List<ProductResponse> filterProductPhone() {
        List<Product> products = productRepository.findByCategory_Name("Phone");
        return products.stream().map(product -> this.convertToDto(product, ProductResponse.class)).toList();
    }

    /**
     * total stock quantity
     *
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
    public List<BestSellingProductResponse> getBestSellingProducts(LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atStartOfDay();
        return orderDetailRepository.findBestSellingProducts(startDateTime, endDateTime);
    }


    @Override
    public boolean existsProduct(String name) {
//        Optional<Product> product = productRepository.findByName(name);
//        if (product.isPresent()) {
//            return true;
//        }
        return false;
    }


    /**
     * Save product
     *
     * @param productRequest
     * @return product
     */
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
                for (MultipartFile file : fileImage) {
                    if (!isValidSuffixImage(Objects.requireNonNull(file.getOriginalFilename()))) {
                        throw new BadRequestException("Invalid image format");
                    }
                    // function saveFile convert to type String -> add hashset images
                    images.add(saveFile(file));
                }

            }

            // create product
            Product product = Product.builder()
                    .productName(productRequest.getProductName())
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


    @Override
    public ProductResponse updateProduct(Long id, ProductRequest productRequest) {
//        System.out.println(productRequest.getFileImage().size());
        // find product by id
        Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));

        // find category and brand by id
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Category not found"));
        Brand brand = brandRepository.findById(productRequest.getBrandId()).orElseThrow(() -> new IllegalArgumentException("Brand not found"));

        try {
            // update
            product.setProductName(productRequest.getProductName());
            product.setPrice(productRequest.getPrice());
            product.setStockQuantity(productRequest.getStockQuantity());
            product.setDescription(productRequest.getDescription());
            product.setCpu(productRequest.getCpu());
            product.setRam(productRequest.getRam());
            product.setOs(productRequest.getOs());
            product.setMonitor(productRequest.getMonitor());
            product.setWeight(productRequest.getWeight());
            product.setBattery(productRequest.getBattery());
            product.setGraphicCard(productRequest.getGraphicCard());
            product.setPort(productRequest.getPort());
            product.setRearCamera(productRequest.getRearCamera());
            product.setFrontCamera(productRequest.getFrontCamera());
            product.setWarranty(productRequest.getWarranty());
            product.setCategory(category);
            product.setBrand(brand);
            product.setUpdatedAt(LocalDateTime.now());


            List<MultipartFile> fileImage = productRequest.getFileImage();
            String thumbnail = product.getThumbnail();
            Set<String> images = product.getImages();

            if (fileImage != null && !fileImage.isEmpty()) { // check if file image is not null and not empty
                MultipartFile firstImage = fileImage.get(0); // get first image
                if (!isValidSuffixImage(Objects.requireNonNull(firstImage.getOriginalFilename()))) {
                    throw new BadRequestException("Image is not valid");
                }
                // Handel thumbnail product
                thumbnail = saveFile(firstImage);


                //Handel images product
                for (MultipartFile file : fileImage) {
                    if (!isValidSuffixImage(Objects.requireNonNull(file.getOriginalFilename()))) {
                        throw new BadRequestException("Invalid image format");
                    }
                    // function saveFile convert to type String -> add hashset images
                    images.add(saveFile(file));
                }


            }
            product.setThumbnail(thumbnail);
            product.setImages(images);


            product = productRepository.save(product);
            return this.convertToDto(product, ProductResponse.class);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<ProductResponse> getRecentProducts() {
        List<Product> recentProducts = productRepository.findRecentProducts();
        return recentProducts.stream().map(product -> this.convertToDto(product, ProductResponse.class)).toList();
    }

    @Override
    public Double calculateTotalRevenue() {
        return productRepository.calculateTotalRevenue();
    }


}

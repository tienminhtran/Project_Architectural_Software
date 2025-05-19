/**
 * @ (#) OrderServiceImpl.java      3/4/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.iuh.fit.dtos.request.OrderDetailRequest;
import vn.edu.iuh.fit.dtos.request.OrderRequest;
import vn.edu.iuh.fit.dtos.response.*;
import vn.edu.iuh.fit.entities.*;
import vn.edu.iuh.fit.entities.ids.OrderDetailId;
import vn.edu.iuh.fit.enums.OrderStatus;
import vn.edu.iuh.fit.exception.UserAlreadyExistsException;
import vn.edu.iuh.fit.repositories.*;
import vn.edu.iuh.fit.services.OrderService;
import vn.edu.iuh.fit.services.UserService;
import vn.edu.iuh.fit.services.VoucherService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 3/4/2025
 */
@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private ModelMapper modelMapper;

    // Phương thức chuyển đổi Order sang DTO với kiểu generic T
    private OrderResponse convertToDto(Order order) {
        return modelMapper.map(order, OrderResponse.class);
    }

    // Phương thức chuyển đổi OrderResponse sang Order với kiểu generic T
    private Order convertToEntity(OrderResponse orderResponse) {
        return modelMapper.map(orderResponse, Order.class);
    }
    // Phương thức chuyển đổi OrderRequest sang Order với kiểu generic T
    private Order convertToEntity(OrderRequest orderRequest) {
        return modelMapper.map(orderRequest, Order.class);
    }

    // Phương thức chuyển đổi User sang DTO với kiểu generic T
    private <T> T convertToDto(User user, Class<T> targetClass) {
        if (user == null) {
            return null;
        }
        return modelMapper.map(user, targetClass);
    }

    // Phương thức chuyển đổi DTO sang User với kiểu generic T
    private <T> User convertToEntity(T tDto, Class<T> dtoClass) {
        return modelMapper.map(tDto, User.class);
    }

    // Phương thức chuyển đổi Voucher sang DTO với kiểu generic T
    private VoucherResponse convertToDto(Voucher voucher) {
        if (voucher == null) {
            return null;
        }
        return modelMapper.map(voucher, VoucherResponse.class);
    }

    // Phương thức chuyển đổi DTO sang Voucher với kiểu generic T
    private Voucher convertToEntityVoucher(VoucherResponse voucherResponse) {
        return modelMapper.map(voucherResponse, Voucher.class);
    }

    @Override
    public List<OrderResponse> findByUsername(String username) {
        List<Order> orders = orderRepository.findByUser_Username(username);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public OrderResponse findById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDto(order);
    }

    @Override
    public PageResponse<OrderResponse> findAll(int pageNo, int pageSize) {
        Pageable page = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.findAll(page);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).toList());
        }
        return response;
    }

    @Override
    public int getTotalOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.size();
    }

    @Override
    public List<RecentOrderResponse> getRecentlyOrders() {
        return orderRepository.findByCreateRecent()
                .stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .sorted(((o1, o2) -> o2.getOrderDate().compareTo(o1.getOrderDate())))
                .limit(6)
                .collect(Collectors.toList());
    }

    @Override
    public int getTotalProductSold() {
        List<Order> orders = orderRepository.findByStatus(OrderStatus.DELIVERED);
        return orders.stream()
                .flatMap(order -> order.getOrderDetails().stream())
                .mapToInt(OrderDetail::getQuantity)
                .sum();
    }

    @Override
    public int getTotalOrderPending() {
        List<Order> orders = orderRepository.findByStatus(OrderStatus.PENDING);
        return orders.size();
    }

    @Override
    public boolean updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        return true;
    }

    @Override
    public List<OrderDetailResponse> getOrderDetailsByOrderId(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return order.getOrderDetails().stream()
                .map(orderDetail -> modelMapper.map(orderDetail, OrderDetailResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public String cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        if(order.getStatus() == OrderStatus.PENDING) {
            if(order.getPayment().getPaymentName().equals("cod")) {
                order.setStatus(OrderStatus.CANCELLED);
                orderRepository.save(order);
                return "Order cancelled successfully";
            }
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            return "Order cancelled successfully. Refund will be processed within 1-2 working days.";
        }
        return "Status Order is "+order.getStatus()+". Order cannot be cancelled.";
    }

    @Override
    public List<OrderResponse> findByCustomerName(String customerName) {
        List<Order> orders = orderRepository.findByUser_Username(customerName);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> findByNamePayMent(String namePayment) {
        List<Order> orders = orderRepository.findByPayment_PaymentName(namePayment);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<DailyOrderResponse> totalOrderByDay() {
        return orderRepository.totalOrderByDay();
    }

    @Override
    public boolean delete(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return true;
    }

    @Override
    public Double getTotalAmountByOrderId(Long orderId) {
        return orderRepository.calculateTotalAmountByOrderId(orderId);
    }

    @Override
    public PageResponse<OrderResponse> searchOrder(String keyword, int pageNo, int pageSize) {
    if (keyword == null || keyword.trim().isEmpty()) {
        throw new IllegalArgumentException("Keyword must not be null or empty");
    }
    Pageable pageable = PageRequest.of(pageNo, pageSize);
    Page<Order> orders = orderRepository.searchOrder(keyword, pageable);
    PageResponse<OrderResponse> response = new PageResponse<>();
    if (orders.hasContent()) {
        response.setPage(pageNo);
        response.setSize(pageSize);
        response.setTotal(orders.getNumberOfElements());
        response.setTotalPages(orders.getTotalPages());
        response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
    }
    return response;
}

    @Override
    public PageResponse<OrderResponse> filterByStatus(OrderStatus status, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.filterByStatus(status, pageable);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
        }
        return response;
    }

    @Override
    public PageResponse<OrderResponse> filterByPayment(String payment, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.filterByPayment(payment, pageable);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
        }
        return response;
    }

    @Override
    public PageResponse<OrderResponse> filterByAll(String firstname, String phoneNumber, String payment, OrderStatus status, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Order> orders = orderRepository.filterByAll(firstname, phoneNumber, payment, status, pageable);
        PageResponse<OrderResponse> response = new PageResponse<>();
        if (orders.hasContent()) {
            response.setPage(pageNo);
            response.setSize(pageSize);
            response.setTotal(orders.getNumberOfElements());
            response.setTotalPages(orders.getTotalPages());
            response.setValues(orders.stream().map(this::convertToDto).collect(Collectors.toList()));
        }
        return response;
    }

    @Transactional
    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) throws UserAlreadyExistsException {
        try {
            // Bước 1: Kiểm tra người dùng
            UserResponse user = userService.findById(orderRequest.getUserId());
            if (user == null) {
                throw new UserAlreadyExistsException("Không tìm thấy người dùng với ID: " + orderRequest.getUserId());
            }

            // Bước 2: Kiểm tra địa chỉ
            if (orderRequest.getAddressId() == null) {
                throw new IllegalArgumentException("Địa chỉ không được để trống");
            }
            Address address = addressRepository.findById(orderRequest.getAddressId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy địa chỉ với ID: " + orderRequest.getAddressId()));

            // Bước 3: Kiểm tra chi tiết đơn hàng
            if (orderRequest.getOrderDetails() == null || orderRequest.getOrderDetails().isEmpty()) {
                throw new IllegalArgumentException("Chi tiết đơn hàng không được để trống");
            }

            // Bước 4: Kiểm tra phương thức thanh toán
            if (orderRequest.getPaymentMethod() == null || orderRequest.getPaymentMethod().isEmpty()) {
                throw new IllegalArgumentException("Phương thức thanh toán không được để trống");
            }
            Payment payment = paymentRepository.findByPaymentName(orderRequest.getPaymentMethod());
            if (payment == null) {
                throw new IllegalArgumentException("Không tìm thấy phương thức thanh toán: " + orderRequest.getPaymentMethod());
            }

            // Bước 5: Kiểm tra trước tất cả các sản phẩm và số lượng hàng tồn kho
            for (OrderDetailRequest detailRequest : orderRequest.getOrderDetails()) {
                Product product = productRepository.findById(detailRequest.getProductId())
                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm với ID: " + detailRequest.getProductId()));

                int requestedQuantity = detailRequest.getQuantity();
                // Kiểm tra số lượng đặt hàng có bé hơn hoặc bằng 0 không
                if (requestedQuantity <= 0) {
                    throw new IllegalArgumentException("Số lượng sản phẩm phải lớn hơn 0: " + product.getProductName());
                }
                // Kiểm tra số lượng hàng tồn kho có đủ không
                if (product.getStockQuantity() < requestedQuantity) {
                    throw new IllegalArgumentException("Không đủ hàng tồn kho cho sản phẩm: " + product.getProductName() +
                            ". Số lượng hiện có: " + product.getStockQuantity() +
                            ", Số lượng đặt hàng: " + requestedQuantity);
                }
            }

            // Bước 6: Kiểm tra voucher (nếu có)
            Optional<VoucherResponse> voucher = Optional.empty();
            Voucher voucherEntity = null;
            if (orderRequest.getVoucherId() != null) {
                voucher = voucherService.findById(orderRequest.getVoucherId());
                if (voucher.isEmpty()) {
                    throw new IllegalArgumentException("Voucher không tồn tại với ID: " + orderRequest.getVoucherId());
                }

                VoucherResponse voucherResponse = voucher.get();
                // Kiểm tra voucher có còn hiệu lực không
                if (voucherResponse.getExpiredDate() != null &&
                        voucherResponse.getExpiredDate().isBefore(LocalDate.now())) {
                    throw new IllegalArgumentException("Voucher đã hết hạn sử dụng: " + voucherResponse.getName());
                }

                // Kiểm tra số lượng voucher có đủ không
                if (voucherResponse.getQuantity() <= 0) {
                    throw new IllegalArgumentException("Voucher đã hết (số lượng: " + voucherResponse.getQuantity() + ")");
                }

                // Chuyển đổi VoucherResponse sang Voucher entity
                voucherEntity = convertToEntityVoucher(voucherResponse);
            }

            // Bước 7: Tạo đơn hàng
            Order order = new Order();
            order.setStatus(OrderStatus.PENDING);
            order.setActive(true);
            order.setCreatedAt(LocalDateTime.now());
            order.setUpdatedAt(LocalDateTime.now());
            order.setUser(convertToEntity(user, UserResponse.class));
            order.setAddress(address);
            order.setVoucher(voucherEntity);
            order.setPayment(payment);
            order.setOrderDetails(new ArrayList<>());
            order.setRatings(null);

            // Bước 8: Lưu đơn hàng
            Order savedOrder = orderRepository.save(order);

            // Bước 9: Tạo và liên kết chi tiết đơn hàng
            List<OrderDetail> orderDetails = new ArrayList<>();
            BigDecimal totalOrderAmount = BigDecimal.ZERO;

            for (OrderDetailRequest detailRequest : orderRequest.getOrderDetails()) {
                Product product = productRepository.findById(detailRequest.getProductId())
                        .orElseThrow(() -> new IllegalArgumentException("Product not found"));

                int requestedQuantity = detailRequest.getQuantity();

                // Tạo ID cho chi tiết đơn hàng
                OrderDetailId orderDetailId = new OrderDetailId();
                orderDetailId.setOrderId(savedOrder.getId());
                orderDetailId.setProductId(product.getId());

                // Tạo chi tiết đơn hàng với ID đã khởi tạo
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setId(orderDetailId);
                orderDetail.setOrder(savedOrder);
                orderDetail.setProduct(product);
                orderDetail.setQuantity(requestedQuantity);

                // Lưu chi tiết đơn hàng
                OrderDetail savedOrderDetail = orderDetailRepository.save(orderDetail);
                orderDetails.add(savedOrderDetail);


                // Tính toán tổng tiền đơn hàng
                BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(requestedQuantity));
                totalOrderAmount = totalOrderAmount.add(itemTotal);

                // Cập nhật số lượng hàng tồn kho
                product.setStockQuantity(product.getStockQuantity() - requestedQuantity);
                productRepository.save(product);
            }

            // Bước 10: Cập nhật số lượng voucher nếu đã sử dụng
            if (voucherEntity != null && voucherEntity.getId() != null) {
                Optional<Voucher> voucherToUpdate = voucherRepository.findById(voucherEntity.getId());
                if (voucherToUpdate.isPresent()) {
                    Voucher v = voucherToUpdate.get();
                    v.setQuantity(v.getQuantity() - 1);
                    // Lưu voucher đã cập nhật
                    Voucher updatedVoucher = voucherRepository.save(v);

                    // Cập nhật voucher trong đơn hàng
                    savedOrder.setVoucher(updatedVoucher);
                    // Lưu đơn hàng đã cập nhật
                    savedOrder = orderRepository.save(savedOrder);
                }
            }

            // Bước 11: Cập nhật chi tiết đơn hàng vào đơn hàng
            savedOrder.setOrderDetails(orderDetails);

            // Bước 12: Chuyển đổi và trả về OrderResponse
            return convertToResponse(savedOrder);
        } catch (IllegalArgumentException e) {
            log.error("Error creating order: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error creating order: {}", e.getMessage());
            throw new RuntimeException("Failed to create order: " + e.getMessage(), e);
        }
    }

    // Hàm chuyển đổi từ Order sang OrderResponse
    private OrderResponse convertToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setActive(order.getActive());
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        response.setStatus(order.getStatus());

        // Chuyển đổi User sang UserResponse
        if (order.getUser() != null) {
            response.setUser(convertToDto(order.getUser(), UserResponse.class));
        }

        // Chuyển đổi Address sang AddressResponse
        if (order.getAddress() != null) {
            response.setAddress(modelMapper.map(order.getAddress(), AddressResponse.class));
        }

        // Chuyển đổi Voucher sang VoucherResponse
        if (order.getVoucher() != null) {
            response.setVoucher(convertToDto(order.getVoucher()));
        } else {
            response.setVoucher(null);
        }

        // Set Rating to null
        response.setRatings(null);

        // Chuyển đổi an toàn Payment sang PaymentResponse
        if (order.getPayment() != null) {
            response.setPayment(modelMapper.map(order.getPayment(), PaymentResponse.class));
        }

        return response;
    }
    @Override
    public List<OrderResponse> findByIDUser(Long idUser) {
        List<Order> orders = orderRepository.findByIDUser(idUser);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> findByPhoneNumber(String phoneNumber) {
        List<Order> orders = orderRepository.findByPhoneNumber(phoneNumber);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

//    @Override
//    public List<OrderResponse> findByPayment(String payment) {
//        List<Order> orders = orderRepository.findByPayment(payment);
//        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
//    }
}

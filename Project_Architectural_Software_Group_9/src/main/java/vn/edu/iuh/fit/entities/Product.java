package vn.edu.iuh.fit.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = {"cartDetails", "images", "ratings", "orderDetails"})
@Entity
@Table(name = "products")
public class Product extends TrackingDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Size(max = 255)
    @Column(name = "battery")
    private String battery;

    @Size(max = 255)
    @Column(name = "cpu")
    private String cpu;

    @Size(max = 255)
    @Column(name = "description")
    private String description;

    @Size(max = 255)
    @Column(name = "front_camera")
    private String frontCamera;

    @Size(max = 255)
    @Column(name = "graphic_card")
    private String graphicCard;

    @Size(max = 255)
    @Column(name = "monitor")
    private String monitor;

    @Size(max = 255)
    @NotBlank(message = "Product's name must not be empty")
    @Column(name = "product_name", nullable = false)
    private String productName;

    @Size(max = 255)
    @Column(name = "os")
    private String os;

    @Size(max = 255)
    @Column(name = "port")
    private String port;

    @Column(name = "price", precision = 38, scale = 2)
    @Min(value = 1, message = "Price of product must be greater than 0")
    private BigDecimal price;

    @Size(max = 255)
    @Column(name = "ram")
    private String ram;

    @Size(max = 255)
    @Column(name = "rear_camera")
    private String rearCamera;

    @NotNull
    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity;

    @Size(max = 255)
    @Column(name = "thumbnail")
    private String thumbnail;

    @Size(max = 255)
    @NotNull
    @Column(name = "warranty", nullable = false)
    private String warranty;

    @Column(name = "weight")
    private Double weight;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "url", nullable = false)
    private Set<String> images = new HashSet<>();

    @OneToMany(mappedBy = "product")
    private List<CartDetail> cartDetails;

    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<Rating> ratings;

}
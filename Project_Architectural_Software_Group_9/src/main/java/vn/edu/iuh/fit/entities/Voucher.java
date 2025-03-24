package vn.edu.iuh.fit.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "vouchers")
@ToString
public class Voucher extends TrackingDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Expired date cannot be null")
    @Future(message = "Expired date must be in the future")
    @Column(name = "expired_date", nullable = false)
    private LocalDate expiredDate;

    @NotNull(message = "Voucher name cannot be null")
    @Column(nullable = false)
    private String name;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private int quantity;

    @NotNull
    @Column(name = "value", nullable = false)
    private double value;

    @OneToMany(mappedBy = "voucher")
    @ToString.Exclude
    private List<Order> orders;
}
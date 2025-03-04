package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.Address}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressResponse implements Serializable {
    Long id;
    @Size(max = 255)
    String city;
    @Size(max = 255)
    String detailLocation;
    @Size(max = 255)
    String district;
    @Size(max = 255)
    String street;
}
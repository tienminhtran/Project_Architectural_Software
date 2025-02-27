package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.Role}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleResponse implements Serializable {
    Long id;
    @Size(max = 50)
    String code;
    @NotNull
    @Size(max = 20)
    String name;
}
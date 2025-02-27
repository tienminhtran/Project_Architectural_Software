package vn.edu.iuh.fit.dtos.response;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.User}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse implements Serializable {
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Long id;
    LocalDate dayOfBirth;
    @NotNull
    @Size(max = 100)
    String email;
    @NotNull
    @Size(max = 255)
    String firstname;
    @Size(max = 255)
    String gender;
    @Size(max = 255)
    String image;
    @NotNull
    boolean active;
    @NotNull
    @Size(max = 255)
    String lastname;
    @NotNull
    @Size(max = 255)
    String password;
    @Size(max = 20)
    String phoneNumber;
    @NotNull
    @Size(max = 100)
    String username;

    RoleResponse role;


}
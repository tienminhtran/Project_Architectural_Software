package vn.edu.iuh.fit.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.entities.User;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO for {@link User}
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
    @JsonProperty("dob")
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
    @JsonProperty("phone_number")
    String phoneNumber;
    @NotNull
    @Size(max = 100)
    String username;

    RoleResponse role;


}
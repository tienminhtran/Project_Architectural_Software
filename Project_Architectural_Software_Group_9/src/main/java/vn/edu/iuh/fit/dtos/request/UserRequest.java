package vn.edu.iuh.fit.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {
    Long id;

    //tieng anh
    @NotBlank(message = "Username is required !")
    String username;

    @NotBlank(message = "Email is required!")
    @Email(message = "Email must contain @.\n Ex: name@gmail.com")
    String email;

    @NotBlank(message = "Password isn't empty!")
    String password;

    @NotNull(message = "Confirm password isn't empty!")
    @JsonProperty("confirm_password")
    String confirmPassword;

    @NotBlank(message = "Phone number is required!")
    @JsonProperty("phone_number")
    String phoneNumber;

    @NotBlank(message = "Enter your first name and middle name if applicable! and not empty!")
    @JsonProperty("firstname")
    String firstName;

    @NotBlank(message = "Enter your last name and not empty!")
    @JsonProperty("lastname")
    String lastName;

    String gender;

    @NotNull(message = "Date of birth is required!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate dob;

    boolean active = false;

    String image = "avtdefault.jpg";

    Long roleId = 1L;

}

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

    @NotBlank(message = "Username là bắt buộc!")
    String username;

    @NotBlank(message = "Email là bắt buộc!")
    @Email(message = "Email nên chứa kí tự @.\n Ex: name@gmail.com")
    String email;

    @NotBlank(message = "Nhập mật khẩu!")
    String password;

    @NotNull(message = "Nhập mật khẩu xác nhận!")
    @JsonProperty("confirm_password")
    String confirmPassword;

    @NotBlank(message = "Số điện thoại là bắt buộc!")
    @JsonProperty("phone_number")
    String phoneNumber;

    @NotBlank(message = "Nhập tên của bạn và tên lót nếu có!")
    @JsonProperty("firstname")
    String firstName;

    @NotBlank(message = "Nhập họ của bạn!")
    @JsonProperty("lastname")
    String lastName;

    String gender;

    @NotNull(message = "Nhập ngày tháng năm sinh!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate dob;

    boolean active = false;

    String image = "avtdefault.jpg";

    Long roleId = 1L;

}

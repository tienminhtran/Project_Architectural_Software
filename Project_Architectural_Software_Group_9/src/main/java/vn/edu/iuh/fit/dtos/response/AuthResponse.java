/**
 * @ (#) AuthResponse.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.dtos.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthResponse implements Serializable {
    private String AccessToken;
    private int ExpiresIn;
    private String RefreshToken;
    private String TokenType;

    public AuthResponse(String accessToken, String refreshToken) {
        this.AccessToken = accessToken;
        this.ExpiresIn = 1000 * 60 * 30;
        this.RefreshToken = refreshToken;
        this.TokenType = "Bearer";
    }
}

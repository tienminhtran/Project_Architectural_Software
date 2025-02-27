/**
 * @ (#) CustomUserDetails.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import vn.edu.iuh.fit.dtos.response.UserResponse;

import java.util.Collection;
import java.util.Collections;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private final UserResponse userDto;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(!userDto.isActive()) {
            throw new DisabledException("User is disabled");
        }
        String role = "ROLE_" + userDto.getRole().getCode();

        return Collections.singleton(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return userDto.getPassword();
    }

    @Override
    public String getUsername() {
        return userDto.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}

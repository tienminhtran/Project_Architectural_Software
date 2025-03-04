/**
 * @ (#) WebSecurityConfig.java      2/27/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import vn.edu.iuh.fit.security.jwt.JwtAuthenticationFilter;
import vn.edu.iuh.fit.services.UserService;

import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/27/2025
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    CustomAccessDeniedHandler customAccessDeniedHandler;

    private final String[] PUBLIC_ENDPOINTS = {"/register", "/user/home", "/forgot-password", "/verify-account",
            "/login","/user/assets/**", "/user/customize/**", "/admin/assets/**"
    };

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        // Get AuthenticationManager bean
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public AuthenticationManager authenticationManager(UserDetailService userService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userService);
        return new ProviderManager(List.of(provider));
    }

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                // Cấu hình CORS cho phép gọi từ domain khác
                .cors(cors -> cors.configurationSource(req -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:3000"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .authorizeHttpRequests(
                        configure -> configure
                                .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/v1/auth/login", "/api/v1/auth/refresh").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/v1/auth/register").permitAll()
                                .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/user","/api/v1/user/**").hasAnyRole("ADMIN", "USER", "MANAGER")
                                .requestMatchers(HttpMethod.GET, "/api/v1/voucher","/api/v1/voucher/**").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers(HttpMethod.POST, "/api/v1/voucher").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/voucher/**").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers(HttpMethod.GET, "/api/v1/product","/api/v1/product/**").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers(HttpMethod.POST, "/api/v1/product").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers("/api/v1/orders","/api/v1/orders/**").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers("/api/v1/orders/me", "/api/v1/orders/me/**").hasAnyRole("ADMIN", "USER", "MANAGER")
                                .anyRequest().authenticated()
                )
                // Dung stateless de su dung JWT
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class) // Thêm JWT Filter
                .exceptionHandling(
                        (ex) -> ex.authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                                .accessDeniedHandler(this.customAccessDeniedHandler));
        return http.build();
    }

}

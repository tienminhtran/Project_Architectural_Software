/**
 * @ (#) JwtTokenProvider.java      2/17/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.security.CustomUserDetails;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 2/17/2025
 */
@Component
public class JwtTokenProvider {

    protected String SIGNER_KEY = "f9b66dcaa8de84de41ce8cd90c993ccec08d988839c077b547ec321553a8054ca9d5ff90d4e5786bb029ff4fc253c36ceb46c7fdfe1e5429a23f7c7a0aba1001";
    // Create a secure key for signing
    // HMAC-SHA256
    SecretKey key = Keys.hmacShaKeyFor(SIGNER_KEY.getBytes());
    // Thoi gian co hieu uc cua token
    private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 30; // 30 phút
    private static final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 7 ngày

    // tao jwt tu thong tin user
    public String generateJwtToken(CustomUserDetails userDetails, long jwt_exp) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwt_exp);

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
        // Build the JWT
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key) // Use the secure key
                .compact(); // Build the JWT
    }

    // Tao access token
    public String generateAccessToken(CustomUserDetails userDetails) {
        return generateJwtToken(userDetails, ACCESS_TOKEN_EXPIRATION);
    }

    // Tao refresh token
    public String generateRefreshToken(CustomUserDetails userDetails) {
        return generateJwtToken(userDetails, REFRESH_TOKEN_EXPIRATION);
    }

    // Lay thong tin user tu jwt
    public List<String> getRolesFromJWT (String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get("roles", List.class);

    }

    public String getUserNameFromJWT (String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();

    }

    // Kiem tra token co hop le khong
    public boolean validateToken (String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (ExpiredJwtException e) {
            System.err.println("JWT expired: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.err.println("Invalid JWT: " + e.getMessage());
        } catch (SignatureException e) {
            System.err.println("Invalid JWT signature: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.err.println("Unsupported JWT: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println("JWT claims string is empty: " + e.getMessage());
        }
        return false;
    }
}

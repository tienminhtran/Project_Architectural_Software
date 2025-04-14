/**
 * @ (#) FireBaseConfig.java      4/14/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/14/2025
 */
@Configuration
public class FireBaseConfig {
    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Kiểm tra xem FirebaseApp đã tồn tại chưa
        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();
        if (!firebaseApps.isEmpty()) {
            for (FirebaseApp app : firebaseApps) {
                if (app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
                    return app; // Trả về instance đã tồn tại
                }
            }
        }

        // Nếu chưa tồn tại, thì khởi tạo mới
        FileInputStream serviceAccount = new FileInputStream("src/main/resources/tech-shop-f5a1c-firebase-adminsdk-fbsvc-921e7de853.json");
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.initializeApp(options);
        }
        return FirebaseApp.initializeApp(options);
    }
}

/**
 * @ (#) CloudinaryService.java      5/11/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.services;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 5/11/2025
 */
@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null || (!contentType.startsWith("image/") && !contentType.equals("application/octet-stream"))) {
            throw new IllegalArgumentException("File is not an image!");
        }
        try {
            Map<String, Object> uploadOption = new HashMap<>();
            uploadOption.put("resource_type", "image");
            Map<?,?> result = cloudinary.uploader().upload(file.getBytes(), uploadOption);

            String url = result.get("secure_url").toString();
            System.out.println("Uploaded image URL: " + url);
            return url;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

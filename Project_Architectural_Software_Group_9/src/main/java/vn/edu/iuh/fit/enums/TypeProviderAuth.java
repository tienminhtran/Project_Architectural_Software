/**
 * @ (#) TypeProviderAuth.java      4/14/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.enums;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/14/2025
 */
public enum TypeProviderAuth {
    GOOGLE("GOOGLE"),
    LOCAL("LOCAL");

    private final String type;

    TypeProviderAuth(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}

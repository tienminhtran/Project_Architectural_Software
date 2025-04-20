/**
 * @ (#) CartDetailRepository.java      4/21/2025
 * <p>
 * Copyright (c) 2025 IUH. All rights reserved
 */

package vn.edu.iuh.fit.repositories;

import vn.edu.iuh.fit.entities.CartDetail;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 4/21/2025
 */
public interface CartDetailRepository {
    CartDetail findByIdProductAndIdCart(Long idProduct);
}

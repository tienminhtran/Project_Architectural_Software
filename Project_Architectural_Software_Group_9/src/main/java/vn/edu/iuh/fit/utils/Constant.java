/*
 * @ {#} Constant.java   1.0     3/7/2025
 *
 * Copyright (c) 2025 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.utils;

import java.text.NumberFormat;
import java.util.Locale;

/*
 * @description:
 * @author: Nguyen Tan Thai Duong
 * @date:   3/7/2025
 * @version:    1.0
 */
public class Constant {
    public static Locale vietnam = new Locale("vi", "VN");
    public static NumberFormat fomatter = NumberFormat.getCurrencyInstance(vietnam);
}


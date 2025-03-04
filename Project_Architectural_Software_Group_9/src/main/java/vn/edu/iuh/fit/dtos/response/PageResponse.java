package vn.edu.iuh.fit.dtos.response;

import lombok.*;

import java.util.Collection;

/*
 * @description:
 * @author: Sinh Phan Tien
 * @date: 11/17/2024
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class PageResponse<T>{
    // current page
    private int page;
    // number of items per page
    private int size;
    // list of values
    private Collection<T> values;
    // total number of items
    private int total;
    // total pages = total / size
    private int totalPages;
    // sort by field
    private String sortBy;
    // sort type ASC or DESC
    private String sortType = "ASC";
}

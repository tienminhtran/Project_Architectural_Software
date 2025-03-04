package vn.edu.iuh.fit.dtos.response;

import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entities.Rating}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RatingResponse implements Serializable {
    RatingIdResponse id;
    String content;
    int star;
}
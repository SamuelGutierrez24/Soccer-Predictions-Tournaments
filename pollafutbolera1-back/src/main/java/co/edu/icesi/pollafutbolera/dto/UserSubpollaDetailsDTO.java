package co.edu.icesi.pollafutbolera.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSubpollaDetailsDTO {

    private Long userId;
    private String username;
    private String email;
    private String fullName;
    private Long subpollaId;
}

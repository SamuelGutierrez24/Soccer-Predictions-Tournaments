package co.edu.icesi.pollafutbolera.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RankingPositionDTO {
    private Long position;
    private Integer score;
}

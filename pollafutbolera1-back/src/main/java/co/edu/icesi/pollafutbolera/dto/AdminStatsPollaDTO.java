package co.edu.icesi.pollafutbolera.dto;

import lombok.Builder;
import java.util.Map;

@Builder
public record AdminStatsPollaDTO(
        int numUsers,
        int numbets,
        double meanPointsPerUser,
        String MVPuser,
        int playedMatchs,
        int leftMatchs,
        Map<Long, Integer> betsPerMatch
) {
}

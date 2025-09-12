package co.edu.icesi.pollafutbolera.service;

import co.edu.icesi.pollafutbolera.dto.AdminStatsPollaDTO;
import co.edu.icesi.pollafutbolera.model.Match;
import co.edu.icesi.pollafutbolera.repository.MatchRepository;
import co.edu.icesi.pollafutbolera.repository.PollaRepository;
import lombok.RequiredArgsConstructor;
import co.edu.icesi.pollafutbolera.repository.UserScoresPollaRepository;
import co.edu.icesi.pollafutbolera.repository.MatchBetRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminStatPollaService {

    private final UserScoresPollaRepository userScoresPollaRepository;
    private final MatchBetRepository matchBetRepository;
    private final PollaRepository pollaRepository;
    private final MatchRepository matchRepository;

    public AdminStatsPollaDTO buildStatsPollaDTO(long pollaId){
        int numUsers = calculateNumUsers(pollaId);
        int numBets = calculateNumBets(pollaId);
        double meanPointsPerUser = calculateMeanPointsPerUser(pollaId);
        String mvpUser = calculateMVPUser(pollaId);
        int playedMatches = calculatePlayedMatches(pollaId);
        int leftMatches = calculateLeftMatches(pollaId);
        Map<Long, Integer> betsPerMatch = calculateBetsPerMatch(pollaId);
        return AdminStatsPollaDTO.builder()
                .numUsers(numUsers)
                .numbets(numBets)
                .meanPointsPerUser(meanPointsPerUser)
                .MVPuser(mvpUser)
                .playedMatchs(playedMatches)
                .leftMatchs(leftMatches)
                .betsPerMatch(betsPerMatch)
                .build();
    }

    private int calculateNumUsers(long id){
        return userScoresPollaRepository.countUsersByPollaId(id);
    }

    private int calculateNumBets(long id){
        return matchBetRepository.countByPollaId(id);
    }

    private double calculateMeanPointsPerUser(long pollaId) {
        List<Integer> scores = userScoresPollaRepository.findByPollaId(pollaId)
                .stream()
                .map(u -> u.getScores())
                .toList();
        if (scores.isEmpty()) return 0.0;
        return scores.stream().mapToInt(Integer::intValue).average().orElse(0.0);
    }

    private String calculateMVPUser(long pollaId) {
        var top = userScoresPollaRepository.findTop10ByPollaIdOrderByScoresDesc(pollaId, org.springframework.data.domain.PageRequest.of(0, 1));
        if (top.isEmpty()) return "";
        return top.get(0).getUser().getNickname();
    }

    private int calculatePlayedMatches(long pollaId) {
        // 1. Obtén la polla y su torneo
        var pollaOpt = pollaRepository.findById(pollaId);
        if (pollaOpt.isEmpty()) return 0;
        var torneo = pollaOpt.get().getTournament();

        List<Match> finishedMatches = matchRepository.findByTournamentAndStatus(torneo, "Match Finished")
                .orElse(List.of());
        return finishedMatches.size();
    }

    private int calculateLeftMatches(long pollaId) {
        var pollaOpt = pollaRepository.findById(pollaId);
        if (pollaOpt.isEmpty()) return 0;
        var torneo = pollaOpt.get().getTournament();

        // Total de partidos del torneo
        List<Match> allMatches = matchRepository.findByTournament(torneo).orElse(List.of());
        int totalMatches = allMatches.size();

        // Partidos jugados (finalizados)
        int played = calculatePlayedMatches(pollaId);

        return totalMatches - played;
    }

    private Map<Long, Integer> calculateBetsPerMatch(long pollaId) {
        Map<Long, Integer> result = new HashMap<>();
        for (Object[] row : matchBetRepository.countBetsPerMatchByPollaId(pollaId)) {
            Long matchId = (Long) row[0];
            Long count = (Long) row[1];
            result.put(matchId, count.intValue());
        }
        return result;
    }


}

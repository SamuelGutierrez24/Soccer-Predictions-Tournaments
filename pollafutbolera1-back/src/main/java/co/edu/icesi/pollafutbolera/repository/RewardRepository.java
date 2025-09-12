package co.edu.icesi.pollafutbolera.repository;

import co.edu.icesi.pollafutbolera.model.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface RewardRepository extends JpaRepository<Reward, Long> {

    Optional<List<Reward>> findByPollaId(Long pollaId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Reward r WHERE r.polla.id = :pollaId")
    void deleteByPollaId(Long pollaId);
}

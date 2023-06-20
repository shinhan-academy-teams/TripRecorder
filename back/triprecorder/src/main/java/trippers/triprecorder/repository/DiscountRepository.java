package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.CardVO;
import trippers.triprecorder.entity.DiscountVO;

public interface DiscountRepository extends JpaRepository<DiscountVO, Long> {
    List<DiscountVO> findByDcCateAndCardIn(String category, List<CardVO> cards);
}


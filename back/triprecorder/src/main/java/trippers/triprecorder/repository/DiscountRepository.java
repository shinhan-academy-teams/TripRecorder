package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.CardVO;
import trippers.triprecorder.entity.DiscountVO;

public interface DiscountRepository extends JpaRepository<DiscountVO, Long> {
	// 카테고리와 카드번호를 가지고 할인혜택조회 메서드
	List<DiscountVO> findByDcCateAndCardIn(String category, List<CardVO> cards);
}

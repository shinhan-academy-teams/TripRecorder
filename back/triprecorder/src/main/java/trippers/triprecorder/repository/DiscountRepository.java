package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import trippers.triprecorder.entity.DiscountVO;

import java.util.List;

public interface DiscountRepository extends JpaRepository<DiscountVO, Long> {
    List<DiscountVO> findByCardNo(Long cardNo);
}

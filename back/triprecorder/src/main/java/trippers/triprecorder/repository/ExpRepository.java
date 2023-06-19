package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import trippers.triprecorder.entity.ExpVO;
import trippers.triprecorder.entity.TripVO;

@Repository
public interface ExpRepository extends JpaRepository<ExpVO, Long> {
	public ExpVO findByExpNo(Long expNo);

	List<ExpVO> findByTripAndSnsNull(TripVO trip);

	@Query("SELECT e.card, COUNT(*) AS usageCount " + "FROM ExpVO e " + "Where e.exp_cate= :category"
			+ "GROUP BY e.card " + "ORDER BY usageCount DESC")
	List<ExpVO> findTop3CardNumbersByExpCate(String category);
}

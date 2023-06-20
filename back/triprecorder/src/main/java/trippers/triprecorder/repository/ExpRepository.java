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

	@Query(value = "SELECT e.card_no, COUNT(*) AS usageCount " + "FROM exp e "
			+ "WHERE e.exp_cate = :category AND NOT e.exp_way = '현금' " + "GROUP BY e.card_no "
			+ "ORDER BY usageCount DESC", nativeQuery = true)
	List<Object> findTop3CardNumbersByExpCate(@Param("category")String category);
}

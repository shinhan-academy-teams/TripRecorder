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
	// 특정 여행(trip)에서 연동된 게시글이 없는 경비 리스트 (for. 게시글 등록)
	List<ExpVO> findByTripAndSnsNullOrderByExpNoDesc(TripVO trip);
	// 결제 방식이 card인 경비에서 카테고리 별 사용 빈도가 높은 3개의 카드 (for. 인기 카드) 
	@Query(value = "SELECT e.card_no, COUNT(*) AS usageCount " + "FROM exp e "
			+ "WHERE e.exp_cate = :category AND NOT e.exp_way = 'cash' " + "GROUP BY e.card_no "
			+ "ORDER BY usageCount DESC LIMIT 3", nativeQuery = true)
	List<Object> findTop3CardNumbersByExpCate(@Param("category")String category);
}

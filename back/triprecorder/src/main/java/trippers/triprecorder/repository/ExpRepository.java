package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import trippers.triprecorder.entity.ExpVO;
import trippers.triprecorder.entity.TripVO;

@Repository
public interface ExpRepository extends JpaRepository<ExpVO, Long> {
	public ExpVO findByExpNo(Long expNo);
	List<ExpVO> findByTripAndSnsNull(TripVO trip);
}

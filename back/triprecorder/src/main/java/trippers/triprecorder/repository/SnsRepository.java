package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;

public interface SnsRepository extends JpaRepository<SnsVO, Long>{
	List<SnsVO> findBySnsAndExpNull(TripVO trip);
}

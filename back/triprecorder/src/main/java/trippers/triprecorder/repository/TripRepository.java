package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;

public interface TripRepository extends JpaRepository<TripVO, Long> {
	List<TripVO> findByUser(UserVO user);
	List<TripVO> findByUser(UserVO user, Sort sort);
}

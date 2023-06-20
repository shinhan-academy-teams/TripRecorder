package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.entity.HeartVO;
import trippers.triprecorder.entity.SnsVO;

public interface HeartRepository extends JpaRepository<HeartVO, MultiKey>{
	List<HeartVO> findBySns(SnsVO sns);
}

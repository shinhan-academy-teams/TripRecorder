package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;

public interface HashtagRepository extends JpaRepository<HashtagVO, Long>{
	List<HashtagVO> findBySns(SnsVO sns);
}

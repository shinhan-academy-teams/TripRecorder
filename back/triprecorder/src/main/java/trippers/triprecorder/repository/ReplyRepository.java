package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.entity.SnsVO;

public interface ReplyRepository extends JpaRepository<ReplyVO, Long>{
	List<ReplyVO> findBySns(SnsVO sns);
}

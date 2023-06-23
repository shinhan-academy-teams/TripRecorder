package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.entity.SnsVO;

public interface ReplyRepository extends JpaRepository<ReplyVO, Long>{
	// 특정 게시글에 해당하는 댓글 리스트 (for. 게시글)
	List<ReplyVO> findBySns(SnsVO sns);
}

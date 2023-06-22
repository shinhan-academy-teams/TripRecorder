package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.entity.HeartVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.UserVO;

public interface HeartRepository extends JpaRepository<HeartVO, MultiKey>{
	// 특정 게시글에 해당하는 좋아요 리스트 (for. 게시글)
	List<HeartVO> findBySns(SnsVO sns);
}

package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;

public interface HashtagRepository extends JpaRepository<HashtagVO, Long>{
	// 특정 게시글에 작성된 해시태그 목록 (for. 게시글)
	List<HashtagVO> findBySns(SnsVO sns);
	// 해시태그가 일치하는 리스트 (for. 해시태그 검색)
	List<HashtagVO> findByHtHashtag(String tag);
}

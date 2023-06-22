package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;

public interface TripRepository extends JpaRepository<TripVO, Long> {
	// 특정 사용자의 여행 다 불러오기 (for. 메인 페이지 내 게시글 전체 불러오기)
	List<TripVO> findByUser(UserVO user);
	// 특정 사용자의 여행 다 불러오기 (for. 여행 카테고리 리스트)
	List<TripVO> findByUser(UserVO user, Sort sort);
}

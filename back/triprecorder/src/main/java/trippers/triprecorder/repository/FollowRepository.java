package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.FollowVO;
import trippers.triprecorder.entity.UserVO;

public interface FollowRepository extends JpaRepository<FollowVO, Long>{
	FollowVO findByFollowerAndFollowing(UserVO follower, UserVO following);
	List<FollowVO> findByFollower(UserVO follower);
	List<FollowVO> findByFollowing(UserVO following);
}

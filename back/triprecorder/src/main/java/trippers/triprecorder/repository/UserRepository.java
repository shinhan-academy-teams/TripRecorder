package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.UserVO;

public interface UserRepository extends JpaRepository<UserVO, Long>{
	public UserVO findByUserId(String userid);
}
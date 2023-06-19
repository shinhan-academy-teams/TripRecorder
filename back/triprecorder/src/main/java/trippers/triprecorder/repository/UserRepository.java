package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.UserVO;

public interface UserRepository extends JpaRepository<UserVO, Long>{
	public UserVO findByUserId(String userid);
	public UserVO findByUserNick(String usernick);
	public UserVO findByUserEmail(String useremail);
	public List<UserVO> findByUserNickContaining(String usernick);
}
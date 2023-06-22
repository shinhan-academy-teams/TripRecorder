package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.ProfileVO;
import trippers.triprecorder.entity.UserVO;

public interface ProfileRepository extends JpaRepository<ProfileVO, Long> {

}

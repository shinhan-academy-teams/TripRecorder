package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.entity.HeartVO;

public interface HeartRepository extends JpaRepository<HeartVO, MultiKey>{

}

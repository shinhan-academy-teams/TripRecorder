package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.SnsVO;

public interface SnsRepository extends JpaRepository<SnsVO, Long>{

}

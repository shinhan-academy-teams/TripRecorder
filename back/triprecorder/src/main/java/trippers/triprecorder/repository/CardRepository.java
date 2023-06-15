package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.CardVO;

public interface CardRepository extends JpaRepository<CardVO, Long>{

}

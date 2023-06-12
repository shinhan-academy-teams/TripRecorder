package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.TripVO;

public interface TripRepository extends JpaRepository<TripVO, Long> {

}

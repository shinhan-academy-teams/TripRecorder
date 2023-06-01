package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.TripVO;

public interface TripRepository extends PagingAndSortingRepository<TripVO, Long>{

}

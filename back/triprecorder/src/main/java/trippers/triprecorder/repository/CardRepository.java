package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.CardVO;

public interface CardRepository extends PagingAndSortingRepository<CardVO, Long>{

}

package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.DiscountVO;

public interface DiscountRepository extends PagingAndSortingRepository<DiscountVO, Long>{

}

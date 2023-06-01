package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.ExpVO;

public interface ExpRepository extends PagingAndSortingRepository<ExpVO, Long>{

}

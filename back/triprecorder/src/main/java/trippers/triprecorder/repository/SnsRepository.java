package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.ProfileVO;
import trippers.triprecorder.vo.SnsVO;

public interface SnsRepository extends PagingAndSortingRepository<SnsVO, Long>{

}

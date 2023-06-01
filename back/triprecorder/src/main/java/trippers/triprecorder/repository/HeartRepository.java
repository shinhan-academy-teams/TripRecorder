package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.HeartVO;
import trippers.triprecorder.vo.MultiKey;

public interface HeartRepository extends PagingAndSortingRepository<HeartVO, MultiKey>{

}

package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.FollowVO;

public interface FollowRepository extends PagingAndSortingRepository<FollowVO, Long>{

}

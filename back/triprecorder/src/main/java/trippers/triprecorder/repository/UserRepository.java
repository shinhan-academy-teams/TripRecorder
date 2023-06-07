package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.UserVO;

public interface UserRepository extends PagingAndSortingRepository<UserVO, Long>{

}

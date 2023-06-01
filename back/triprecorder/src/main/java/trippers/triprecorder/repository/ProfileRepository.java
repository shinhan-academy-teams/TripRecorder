package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.ProfileVO;

public interface ProfileRepository extends PagingAndSortingRepository<ProfileVO, Long>{

}

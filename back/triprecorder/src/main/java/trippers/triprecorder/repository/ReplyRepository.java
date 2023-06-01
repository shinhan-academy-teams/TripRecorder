package trippers.triprecorder.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import trippers.triprecorder.vo.ProfileVO;
import trippers.triprecorder.vo.ReplyVO;
import trippers.triprecorder.vo.SnsVO;

public interface ReplyRepository extends PagingAndSortingRepository<ReplyVO, Long>{

}

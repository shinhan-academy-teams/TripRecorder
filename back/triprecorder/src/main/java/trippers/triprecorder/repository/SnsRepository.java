package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;

public interface SnsRepository extends JpaRepository<SnsVO, Long>{
	List<SnsVO> findBySnsAndExpNull(TripVO trip);
	List<SnsVO> findBySnsInAndSnsScopeInOrSnsInOrderBySnsNoDesc(List<TripVO> following, Integer[] scope, List<TripVO> my);
	List<SnsVO> findBySnsScopeOrderBySnsNoDesc(Integer scope);
	List<SnsVO> findBySnsOrderBySnsNoDesc(TripVO trip);
	List<SnsVO> findByHashtagInAndSnsScope(List<HashtagVO> hashtag, Integer scope);
//	List<SnsVO> findByHashtagInAndSnsScopeInOrHashtagInOrderBySnsNoDesc(List<HashtagVO> tag1, )
}

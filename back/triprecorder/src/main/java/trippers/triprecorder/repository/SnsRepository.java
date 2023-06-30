package trippers.triprecorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;

public interface SnsRepository extends JpaRepository<SnsVO, Long> {
	// 특정 여행(sns)에서 연결된 경비(exp)가 없는 게시글 리스트 (for. 경비 등록)
	List<SnsVO> findBySnsAndExpNullOrderBySnsNoDesc(TripVO trip);

	// 특정 여행(sns)이 여기에 포함되고(팔로잉중인 사용자의 모든 TripVO) 공개범위가 0, 1 또는 내 게시글 (for. 메인화면 -
	// 로그인 후)
	List<SnsVO> findBySnsInAndSnsScopeInOrSnsInOrderBySnsNoDesc(List<TripVO> following, Integer[] scope,
			List<TripVO> my);

	// 전체 공개 게시글 (for. 메인화면 - 로그인 전)
	List<SnsVO> findBySnsScopeOrderBySnsNoDesc(Integer scope);

	// 특정 여행(sns)의 게시글 (for. 내 프로필 - 여행 카테고리 리스트)
	List<SnsVO> findBySnsOrderBySnsNoDesc(TripVO trip);

	// 특정 해시태그(hashtag)를 포함하고 공개 범위가 전체인 게시글 (for. 해시태그 검색 - 로그인 전)
	List<SnsVO> findByHashtagInAndSnsScopeOrderBySnsNoDesc(List<HashtagVO> hashtag, Integer scope);

	// 특정 해시태그를 포함하고 (팔로우하는 사용자의 게시글 중 공개 범위가 팔로우 공개) or (내 게시글 중 전체 공개가 아님) or (전체
	// 공개) (for. 해시태그 검색 - 로그인 후)
	@Query(value = "select sns_no from sns join trip using(trip_no) join user using(user_no) join hashtag using(sns_no) "
			+ "    where ht_hashtag=?1 and " + "	((user_no in (select user.user_no from user "
			+ "		join follow on (user.user_no=follow.following) " + "        where follower = ?2) "
			+ "        and sns_scope = 0)  " + "	or (user_no = ?2 and sns_scope != 1) " + "    or (sns_scope = 1)) "
			+ "    order by sns_no desc", nativeQuery = true)
	List<SnsVO> findByTagWithSignin(String hashtag, Long userNo);

	List<SnsVO> findBySnsAndSnsScopeIn(TripVO trip, Integer[] scope);
}

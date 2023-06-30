package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FeaturePolicyConfig;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import trippers.triprecorder.dto.SnsDto;
import trippers.triprecorder.entity.ExpVO;
import trippers.triprecorder.entity.FollowVO;
import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.ExpRepository;
import trippers.triprecorder.repository.FollowRepository;
import trippers.triprecorder.repository.HashtagRepository;
import trippers.triprecorder.repository.HeartRepository;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.EncodingUtil;
import trippers.triprecorder.util.MakeSnsUtil;

// sns 게시글
@RestController
@RequestMapping("/sns")
public class SnsController {
	@Autowired
	TripRepository trepo;
	@Autowired
	SnsRepository srepo;
	@Autowired
	ExpRepository erepo;
	@Autowired
	UserRepository urepo;
	@Autowired
	ReplyRepository rrepo;
	@Autowired
	HeartRepository hrepo;
	@Autowired
	HashtagRepository tagrepo;
	@Autowired
	FollowRepository frepo;

	// 게시글 등록
	@PostMapping("/register")
	public String postRegisterSns(@RequestBody ObjectNode obj) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Long tripNo = obj.get("tripNo").asLong();
		Long expNo = obj.get("expNo").asLong();
		List<String> hashtag = mapper.treeToValue(obj.get("hashtag"), List.class);
		SnsVO sns = mapper.treeToValue(obj.get("sns"), SnsVO.class);

		List<HashtagVO> tagList = new ArrayList<>();

		for (String tag : hashtag) {
			HashtagVO t = HashtagVO.builder().htHashtag(tag).sns(sns).build();
			tagList.add(t);
		}

		if (tagList.size() > 0) {
			sns.setHashtag(tagList);
		}

		trepo.findById(tripNo).ifPresent(trip -> sns.setSns(trip));
		if (sns.getSnsContent() == null || sns.getSnsContent().trim().equals("")) {
			sns.setSnsContent(null);
		}

		SnsVO savedSns = srepo.save(sns);
		erepo.findById(expNo).ifPresent(exp -> {
			exp.setSns(savedSns);
			erepo.save(exp);
		});

		return "OK";
	}

	// 게시글 조회 (메인페이지)
	@GetMapping("/list")
	public List<SnsDto> getSnsList(HttpServletRequest request) {
		String obj = request.getHeader("Authorization");
		List<SnsVO> tmpSnsList = new ArrayList<>();
		Long userNo = null;

		if (obj != null) {
			userNo = EncodingUtil.getUserNo(request);
			UserVO user = urepo.findById(userNo).orElse(null);
			List<FollowVO> following = frepo.findByFollower(user);

			List<TripVO> myTrip = trepo.findByUser(user);
			List<TripVO> followingTrip = new ArrayList<>();
			following.forEach(f -> {
				trepo.findByUser(f.getFollowing()).forEach(t -> followingTrip.add(t));
			});

			tmpSnsList = srepo.findBySnsInAndSnsScopeInOrSnsInOrderBySnsNoDesc(followingTrip, new Integer[] { 0, 1 },
					myTrip);
		} else {
			tmpSnsList = srepo.findBySnsScopeOrderBySnsNoDesc(1);
		}

		List<SnsDto> snsList = new ArrayList<>();

		for (int i = 0; i < tmpSnsList.size(); i++) {
			SnsVO tmpSns = tmpSnsList.get(i);
			SnsDto sns = MakeSnsUtil.makeSnsDto(tmpSns, userNo, urepo, rrepo, hrepo, tagrepo);

			if (tmpSns.getExp() != null) {
				sns.setExpNo(tmpSns.getExp().getExpNo());
			}

			snsList.add(sns);
		}

		return snsList;
	}

	// 게시글 조회(사용자 프로필)
	@GetMapping("/{tripNo}/list")
	public List<JSONObject> getTripSnsList(HttpServletRequest request, @PathVariable Long tripNo) {
		List<JSONObject> snsList = new ArrayList<>();
		TripVO trip = trepo.findById(tripNo).orElse(null);
		Long profileUserNo = trip.getUser().getUserNo();

		String tokenObj = request.getHeader("Authorization");
		Long userNo = 0L;
		if (tokenObj != null)
			userNo = EncodingUtil.getUserNo(request);
		Integer[] scope = null;

		// 모르는 사람의 게시글인 경우
		// 전체 공개 게시글
		if (userNo == 0L) {
			scope = new Integer[] { 1 };
		}
		// 내 프로필인 경우
		// 모든 데이터 공개
		else if (userNo.equals(profileUserNo)) {
			scope = new Integer[] { -1, 0, 1 };
		}

		else {
			UserVO follower = urepo.findById(userNo).orElse(null);
			UserVO following = urepo.findById(profileUserNo).orElse(null);

			FollowVO follow = frepo.findByFollowerAndFollowing(follower, following);
			if (follow == null) {
				scope = new Integer[] { 1 };
			} else {
				scope = new Integer[] { 1, 0 };
			}
		}

		List<SnsVO> tmpSnsList = srepo.findBySnsAndSnsScopeIn(trip, scope);

		tmpSnsList.forEach(sns -> {
			Integer heartCnt = hrepo.findBySns(sns).size();
			Integer replyCnt = rrepo.findBySns(sns).size();

			JSONObject obj = new JSONObject();
			obj.put("snsNo", sns.getSnsNo());
			obj.put("heartCnt", heartCnt);
			obj.put("replyCnt", replyCnt);
			obj.put("tripNo", trip.getTripNo());

			String imgKey = sns.getSnsPhoto().split("@")[0];
			obj.put("thumbnail", AwsUtil.getImageURL(imgKey));

			snsList.add(obj);
		});

		return snsList;
	}

	// 연결된 경비가 없는 게시글 조회
	@PostMapping("/list/{tripNo}")
	public List<JSONObject> postSnsList(@PathVariable Long tripNo) {
		TripVO trip = trepo.findById(tripNo).orElse(null);
		List<SnsVO> tmpSnsList = srepo.findBySnsAndExpNullOrderBySnsNoDesc(trip);

		List<JSONObject> snsList = new ArrayList<>();
		tmpSnsList.forEach(sns -> {
			JSONObject obj = new JSONObject();
			obj.put("snsNo", sns.getSnsNo());
			obj.put("snsTitle", sns.getSnsTitle());
			snsList.add(obj);
		});

		return snsList;
	}

	// 게시글 상세보기
	@GetMapping("/detail/{snsNo}")
	public SnsDto getSnsDetail(HttpServletRequest request, @PathVariable Long snsNo) {
		String obj = request.getHeader("Authorization");
		Long userNo = null;

		if (obj != null) {
			userNo = EncodingUtil.getUserNo(request);
		}
		SnsVO tmpSns = srepo.findById(snsNo).orElse(null);
		SnsDto sns = MakeSnsUtil.makeSnsDto(tmpSns, userNo, urepo, rrepo, hrepo, tagrepo);

		return sns;
	}

	// 게시글 삭제
	@DeleteMapping("/delete/{snsNo}")
	public String deleteSns(@PathVariable Long snsNo) {
		SnsVO sns = srepo.findById(snsNo).orElse(null);

		ExpVO exp = sns.getExp();
		if (exp != null) {
			exp.setSns(null);
		}

		String[] images = sns.getSnsPhoto().split("@");
		AwsUtil.deleteBucketObjects(images);
		srepo.delete(sns);

		return "OK";
	}
}
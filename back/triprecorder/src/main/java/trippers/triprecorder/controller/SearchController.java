package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.SnsDto;
import trippers.triprecorder.dto.UserSimpleDto;
import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.HashtagRepository;
import trippers.triprecorder.repository.HeartRepository;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.EncodingUtil;
import trippers.triprecorder.util.MakeSnsUtil;

// 검색
@RestController
@RequestMapping("/search")
public class SearchController {
	@Autowired
	UserRepository urepo;
	@Autowired
	SnsRepository srepo;
	@Autowired
	HashtagRepository tagrepo;
	@Autowired
	ReplyRepository rrepo;
	@Autowired
	HeartRepository hrepo;
	@Autowired
	TripRepository trepo;

	// 해시태그 검색
	@PostMapping("/hashtag")
	public List<SnsDto> postSearchHashtag(HttpServletRequest request, @RequestBody JSONObject tagObj) {
		String obj = request.getHeader("Authorization");
		String searchTag = tagObj.get("search").toString();
		List<HashtagVO> tagList = tagrepo.findByHtHashtag(searchTag);
		List<SnsVO> tmpSnsList = null;
		Long userNo = null;

		if (obj != null) {
			userNo = EncodingUtil.getUserNo(request);
			// 로그인 후
			tmpSnsList = srepo.findByTagWithSignin(searchTag, userNo);
		} else {
			// 로그인 전
			tmpSnsList = srepo.findByHashtagInAndSnsScopeOrderBySnsNoDesc(tagList, 1);
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

	// 닉네임 검색
	@PostMapping("/nickname")
	public List<UserSimpleDto> postSearchNickname(@RequestBody JSONObject obj) {
		List<UserVO> tmpUserList = urepo.findByUserNickContaining(obj.get("search").toString());
		List<UserSimpleDto> userList = new ArrayList<>();

		tmpUserList.forEach(user -> {
			UserSimpleDto u = UserSimpleDto.builder().userNo(user.getUserNo()).userNick(user.getUserNick())
					.userId(user.getUserId()).userProfile(AwsUtil.getImageURL(user.getProfile().getProfilePhoto()))
					.build();

			userList.add(u);
		});

		return userList;
	}

	// 사용자의 여행 카테고리, 게시글 수
	@GetMapping("/data/{userNo}")
	public JSONObject getNumOfData(@PathVariable Long userNo) {
		JSONObject obj = new JSONObject();
		UserVO user = urepo.findById(userNo).orElse(null);
		List<TripVO> trip = trepo.findByUser(user);
		int sns = 0;
		for (int i = 0; i < trip.size(); i++) {
			sns += srepo.findBySnsOrderBySnsNoDesc(trip.get(i)).size();
		}

		obj.put("tripNum", trip.size());
		obj.put("snsNum", sns);

		return obj;
	}

}

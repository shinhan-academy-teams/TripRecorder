package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.dto.ReplyDto;
import trippers.triprecorder.dto.SnsDto;
import trippers.triprecorder.dto.UserSimpleDto;
import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.HashtagRepository;
import trippers.triprecorder.repository.HeartRepository;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.MakeSnsUtil;

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
	
	
	// 해시태그 검색
	@PostMapping("/hashtag")
	public List<SnsDto> postSearchHashtag(HttpServletRequest request, @RequestBody JSONObject tagObj) {
		String obj = request.getHeader("Authorization");
		
		List<HashtagVO> tagList = tagrepo.findByHtHashtag(tagObj.get("hashtag").toString());
		List<SnsVO> tmpSnsList = null;
		
		if(obj != null) {
			// 로그인 후
		} else {
			tmpSnsList = srepo.findByHashtagInAndSnsScope(tagList, 1);
		}

		List<SnsDto> snsList = new ArrayList<>();
		
		tmpSnsList.forEach(tmpSns -> {
			SnsDto sns = SnsDto.builder()
					.tripNo(tmpSns.getSns().getTripNo())
					.snsNo(tmpSns.getSnsNo())
					.snsTitle(tmpSns.getSnsTitle())
					.snsContent(tmpSns.getSnsContent())
					.snsPhoto(MakeSnsUtil.getSnsImages(tmpSns.getSnsPhoto()))
					.snsRegdate(tmpSns.getSnsRegdate())
					.snsScope(tmpSns.getSnsScope())
					.snsUser(MakeSnsUtil.getAnyUser(tmpSns.getSns().getUser().getUserNo(), urepo))
					.reply(MakeSnsUtil.getSnsReply(tmpSns, rrepo, urepo))
					.heart(MakeSnsUtil.getSnsHeart(tmpSns, tmpSns.getSns().getUser().getUserNo(), hrepo))
					.hashtag(MakeSnsUtil.getSnsHashtag(tmpSns, tagrepo))
					.build();
			

			if(tmpSns.getExp() != null) {
				sns.setExpNo(tmpSns.getExp().getExpNo());
			}
			
			snsList.add(sns);
		});
		
		return snsList; 
	}
	
	// 닉네임 검색
	@PostMapping("/nickname")
	public List<UserSimpleDto> postSearchNickname(@RequestBody JSONObject obj) {
		List<UserVO> tmpUserList = urepo.findByUserNickContaining(obj.get("nickname").toString());
		List<UserSimpleDto> userList = new ArrayList<>();
		
		tmpUserList.forEach(user -> {
			UserSimpleDto u = UserSimpleDto.builder()
					.userNo(user.getUserNo())
					.userNick(user.getUserNick())
					.userProfile(AwsUtil.getImageURL(user.getProfile().getProfilePhoto()))
					.build();
			
			userList.add(u);
		});
		
		return userList;
	}
	
}

package trippers.triprecorder.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.HeaderInfoDto;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.EncodingUtil;
import trippers.triprecorder.util.JsonUtil;

@RestController
public class TmpController {
	@Autowired
	UserRepository urepo;
	@Autowired
	SnsRepository srepo;
	
	// 회원가입 - 아이디 중복 체크
	// 중복이다 - true, 중복이 아니다 - false
	@PostMapping(value = "/join/useridCheck")
//	public boolean postUseridCheck(@RequestBody UserVO user)
	public boolean postUseridCheck(@RequestBody Map<String, String> userMap) {
//		UserVO findUser = urepo.findByUserId(user.getUserId());
		UserVO findUser = urepo.findByUserId(userMap.get("userId"));
		return findUser != null;
	}


	// payload 복호화
	@GetMapping("/decode")
	public HeaderInfoDto decoding(HttpServletRequest request) {
		String jwt = request.getHeader("Authorization");

		String decodeStr = EncodingUtil.getDecodedStr(jwt.replace('.', '@').split("@")[1]);
		JSONObject jsonObj = JsonUtil.getStringToJsonObj(decodeStr);

		HeaderInfoDto info = HeaderInfoDto.builder().userno(jsonObj.get("userno")).uesrid(jsonObj.get("userid"))
				.usernick(jsonObj.get("usernick")).build();
		System.out.println(jsonObj.get("userId"));
		return info;
	}

	// 비밀번호 일치여부 확인
	@GetMapping("/password")
	public String passwordTest() {
		String user1 = urepo.findByUserId("user2").getUserPw();
		String test = "123";

		return EncodingUtil.verifyUserPw(test, user1) ? "같아" : "달라";

	}
	
	// 게시글 가져올 데이터 설정 (사진 가져오기)
	@GetMapping("/getSns") 
	public JSONObject getSnsTest() {
		SnsVO savedSns = srepo.findById(66L).orElse(null); 

		// 데이터는 나중에 snsDto 설정하자
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("tripNo", savedSns.getSns().getTripNo());
		jsonObj.put("snsNo", savedSns.getSnsNo());
		jsonObj.put("snsTitle", savedSns.getSnsTitle());
		jsonObj.put("snsContent", savedSns.getSnsContent());
		
		String images = "";
		String[] tmpImage = savedSns.getSnsPhoto().split("@");
		for(String img : tmpImage) {
			if(!img.equals("")) {
				images += AwsUtil.getImageURL(img) + "@";
			}
		}
		if(images.length() != 1) {
			images = images.substring(0, images.length() - 1);
		}
		
		jsonObj.put("snsPhoto", images);
		jsonObj.put("snsRegdate", savedSns.getSnsRegdate());
		jsonObj.put("snsScope", savedSns.getSnsScope());
		
		return jsonObj;
	}

}

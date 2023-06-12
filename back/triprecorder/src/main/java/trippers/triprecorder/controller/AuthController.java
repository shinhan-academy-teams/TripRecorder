package trippers.triprecorder.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.HeaderInfo;
import trippers.triprecorder.dto.Role;
import trippers.triprecorder.entity.ProfileVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.EncodingUtil;
import trippers.triprecorder.util.JsonUtil;

@RestController
public class AuthController {
	@Autowired
	private UserRepository urepo;

	// 회원가입
	@PostMapping("/join")
	public String join(@RequestBody UserVO user) {
		ProfileVO profile = ProfileVO.builder().build();
		user.setProfile(profile);
		user.setUserPw(EncodingUtil.encodingUserPw(user.getUserPw()));
		user.setUserRole(Role.ROLE_USER);
		profile.setUser(user);

		urepo.save(user);
		return "회원가입 성공";
	}

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
	public HeaderInfo decoding(HttpServletRequest request) {
		String jwtstring = request.getHeader("Authorization");

		String decodeStr = EncodingUtil.getDecodedStr(jwtstring.replace('.', '@').split("@")[1]);
		JSONObject jsonObj = JsonUtil.getJsonObj(decodeStr);

		HeaderInfo info = HeaderInfo.builder().userno(jsonObj.get("userno")).uesrid(jsonObj.get("userid"))
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

}

package trippers.triprecorder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.Role;
import trippers.triprecorder.entity.ProfileVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.EncodingUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private UserRepository urepo;

	// 회원가입 - 아이디 중복 체크
	// 중복이다 - true, 중복이 아니다 - false
	@PostMapping(value = "/signup/useridCheck")
	public boolean postUseridCheck(@RequestBody UserVO user) {
		UserVO findUser = urepo.findByUserId(user.getUserId());
		return findUser != null;
	}

	// 회원가입 - 닉네임 중복 체크
	// 중복이다 - true, 중복이 아니다 - false
	@PostMapping(value = "/signup/usernickCheck")
	public boolean postUsernickCheck(@RequestBody UserVO user) {
		UserVO findUser = urepo.findByUserNick(user.getUserNick());
		return findUser != null;
	}

	// 회원가입 - 이메일 중복 체크
	// 중복이다 - true, 중복이 아니다 - false
	@PostMapping(value = "/signup/useremailCheck")
	public boolean postUseremailCheck(@RequestBody UserVO user) {
		UserVO findUser = urepo.findByUserEmail(user.getUserEmail());
		return findUser != null;
	}

	// 회원가입
	@PostMapping("/signup")
	public String join(@RequestBody UserVO user) {
		ProfileVO profile = ProfileVO.builder().build();
		user.setProfile(profile);
		user.setUserPw(EncodingUtil.encodingUserPw(user.getUserPw()));
		user.setUserRole(Role.ROLE_USER);
		profile.setUser(user);

		urepo.save(user);
		return "OK";
	}
}

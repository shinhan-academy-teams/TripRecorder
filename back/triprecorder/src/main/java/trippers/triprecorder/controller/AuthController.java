package trippers.triprecorder.controller;

import javax.servlet.http.HttpServletRequest;

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
		boolean result = true;
		String userId = user.getUserId();
		if(!userId.equals("")) {
			UserVO findUser = urepo.findByUserId(userId);
			result = findUser != null;
		}
		return result;
	}

	// 회원가입 - 닉네임 중복 체크
	// 중복이다 - true, 중복이 아니다 - false
	@PostMapping(value = "/signup/usernickCheck")
	public boolean postUsernickCheck(HttpServletRequest request, @RequestBody UserVO user) {
		String obj = request.getHeader("Authorization");
		UserVO findUser = null;
		boolean result = true;
		String userNick = user.getUserNick();
		
		if(!userNick.equals("")) {
			if(obj != null) {
				Long userNo = EncodingUtil.getUserNo(request);
				findUser = urepo.findByUserNickAndUserNoNot(userNick, userNo);
			} else {
				findUser = urepo.findByUserNick(userNick);	
			}
			
			result = findUser != null;
		}		
		
		return result;
	}

	// 회원가입 - 이메일 중복 체크
	// 중복이다 - true, 중복이 아니다 - false
	@PostMapping(value = "/signup/useremailCheck")
	public boolean postUseremailCheck(HttpServletRequest request, @RequestBody UserVO user) {
		String obj = request.getHeader("Authorization");
		UserVO findUser = null;
		boolean result = true;
		String userEmail = user.getUserEmail();
		
		if(!userEmail.equals("")) {
			if(obj != null) {
				Long userNo = EncodingUtil.getUserNo(request);
				findUser = urepo.findByUserEmailAndUserNoNot(userEmail, userNo);
			} else {
				findUser = urepo.findByUserEmail(userEmail);	
			}
			result = findUser != null;
		}
		
		return result;
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

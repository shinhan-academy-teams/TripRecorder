package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import trippers.triprecorder.dto.ProfileDto;
import trippers.triprecorder.dto.ProfileUpdateDto;
import trippers.triprecorder.entity.ProfileVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.FollowRepository;
import trippers.triprecorder.repository.ProfileRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.EncodingUtil;

@RestController
@RequestMapping("/profile")
public class ProfileController {
	@Autowired
	UserRepository urepo;
	@Autowired
	FollowRepository frepo;
	@Autowired
	ProfileRepository prepo;

	// 사용자 프로필 조회
	@GetMapping("/{userNo}")
	public ProfileDto getUserProfile(HttpServletRequest request, @PathVariable Long userNo) {
		String obj = request.getHeader("Authorization");
		UserVO user = urepo.findById(userNo).orElse(null);
		Integer following = frepo.findByFollower(user).size();
		Integer follower = frepo.findByFollowing(user).size();
		// 팔로잉하지 않은 상태
		Integer isFollowing = -1;

		if (obj != null) {
			Long loginNo = EncodingUtil.getUserNo(request);
			// 내 계정일 때
			if (userNo == loginNo)
				isFollowing = 0;
			// 팔로잉중
			else if (frepo.findByFollowing(user).size() != 0)
				isFollowing = 1;
		}

		ProfileDto profile = ProfileDto.builder().userNo(user.getUserNo()).userNick(user.getUserNick())
				.profilePhoto(AwsUtil.getImageURL(user.getProfile().getProfilePhoto()))
				.profileMsg(user.getProfile().getProfileMsg()).userLevel(user.getUserLevel()).follower(follower)
				.following(following).isFollowing(isFollowing).build();

		return profile;
	}

	// 페이지 진입시 회원정보 조회
	@GetMapping("/update/{userNo}")
	public ProfileUpdateDto getUserProfileForUpdate(HttpServletRequest request, @PathVariable Long userNo) {
		UserVO user = urepo.findById(userNo).orElse(null);
		ProfileVO profile = prepo.findById(userNo).orElse(null);

		ProfileUpdateDto updateProfile = ProfileUpdateDto.builder().userName(user.getUserName())
				.userGender(user.getUserGender()).userNick(user.getUserNick()).userEmail(user.getUserEmail())
				.profilePhoto(AwsUtil.getImageURL(profile.getProfilePhoto())).profileMsg(profile.getProfileMsg())
				.build();

		return updateProfile;
	}

	// 저장 버튼 눌렀을 때 수정
	@PutMapping("/click")
	public String putUserProfileForUpdate(@RequestBody ObjectNode obj) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		
		UserVO user = mapper.treeToValue(obj.get("user"), UserVO.class);
		ProfileVO tmpProfile = mapper.treeToValue(obj.get("profile"), ProfileVO.class);

		UserVO tmpUser = urepo.findById(user.getUserNo()).orElse(null);
		ProfileVO profile = prepo.findById(tmpUser.getUserNo()).orElse(null);
		
		tmpUser.setUserName(user.getUserName());
		tmpUser.setUserGender(user.getUserGender());
		tmpUser.setUserNick(user.getUserNick());
		tmpUser.setUserEmail(user.getUserEmail());
		
//		profile.setUser(tmpUser);
		
//		profile.setProfileNo(tmpUser.getProfile().getProfileNo());
		profile.setProfileMsg(tmpUser.getProfile().getProfileMsg());

		tmpUser.setUserPw(EncodingUtil.encodingUserPw(user.getUserPw()));

		String profilePhoto = tmpProfile.getProfilePhoto();

		if (profilePhoto.trim().isEmpty()) {
			profile.setProfilePhoto("profile/default_profile.png");
			
		} else if (!profilePhoto.equals("no")) {
			
			profile.setProfilePhoto(profilePhoto);
		}

		tmpUser.setProfile(profile);

		UserVO savedUser = urepo.save(tmpUser);

		if (savedUser != null) {
			return "ok";
		} else {
			return "fail";
		}
	}
}

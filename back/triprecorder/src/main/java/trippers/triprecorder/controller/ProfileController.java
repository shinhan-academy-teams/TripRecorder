package trippers.triprecorder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.ProfileDto;
import trippers.triprecorder.entity.FollowVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.FollowRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;

@RestController
@RequestMapping("/profile")
public class ProfileController {
	@Autowired
	UserRepository urepo;
	@Autowired
	FollowRepository frepo;
	
	// 사용자 프로필 조회
	@GetMapping("/{userNo}")
	public ProfileDto getUserProfile(@PathVariable Long userNo) {
		UserVO user = urepo.findById(userNo).orElse(null);
		Integer following = frepo.findByFollower(user).size();
		Integer follower = frepo.findByFollowing(user).size();
		
		ProfileDto profile = ProfileDto.builder()
				.userNo(user.getUserNo())
				.userNick(user.getUserNick())
				.profilePhoto(AwsUtil.getImageURL(user.getProfile().getProfilePhoto()))
				.profileMsg(user.getProfile().getProfileMsg())
				.userLevel(user.getUserLevel())
				.follower(follower)
				.following(following)
				.build();
		
		return profile;
	}
}

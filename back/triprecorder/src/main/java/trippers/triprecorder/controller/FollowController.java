package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.UserSimpleDto;
import trippers.triprecorder.entity.FollowVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.FollowRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.EncodingUtil;

@RestController
@RequestMapping("/follow")
public class FollowController {
	@Autowired
	FollowRepository frepo;
	@Autowired
	UserRepository urepo;
	
	// 팔로우 등록 및 취소
	@PostMapping("/register/{userNo}")
	public boolean postRegisterFollow(HttpServletRequest request, @PathVariable Long userNo) {
		Long followerNo = EncodingUtil.getUserNo(request);
		boolean result = true;
		
		UserVO follower = urepo.findById(followerNo).orElse(null);
		UserVO following = urepo.findById(userNo).orElse(null);
		
		FollowVO follow = frepo.findByFollowerAndFollowing(follower, following);
		
		if(follow == null) {
			FollowVO f = FollowVO.builder()
					.follower(follower)
					.following(following)
					.build();
			frepo.save(f);
		} else {
			frepo.delete(follow);
			result = false;
		}
		return result;
	}
	
	// 사용자의 팔로워 리스트
	@GetMapping("/{userNo}/follower/list")
	public List<UserSimpleDto> getFollowerList(@PathVariable Long userNo) {
		UserVO tmpFollowing = urepo.findById(userNo).orElse(null);
		List<FollowVO> tmpFollowingList = frepo.findByFollowing(tmpFollowing);
		
		List<UserSimpleDto> followingList = new ArrayList<>();

		tmpFollowingList.forEach(following -> {
			UserVO tmpUser = following.getFollower();
			UserSimpleDto user = UserSimpleDto.builder()
					.userNo(tmpUser.getUserNo())
					.userNick(tmpUser.getUserNick())
					.userId(tmpUser.getUserId())
					.userProfile(AwsUtil.getImageURL(tmpUser.getProfile().getProfilePhoto()))
					.build();
			followingList.add(user);
		});
		
		return followingList;
	}
	
	// 사용자의 팔로잉 리스트
	@GetMapping("/{userNo}/following/list")
	public List<UserSimpleDto> getFollowingList(@PathVariable Long userNo) {
		UserVO tmpFollower = urepo.findById(userNo).orElse(null);
		List<FollowVO> tmpFollowerList = frepo.findByFollower(tmpFollower);
		
		List<UserSimpleDto> followerList = new ArrayList<>();
		
		tmpFollowerList.forEach(follower -> {
			UserVO tmpUser = follower.getFollowing();
			UserSimpleDto user = UserSimpleDto.builder()
					.userNo(tmpUser.getUserNo())
					.userNick(tmpUser.getUserNick())
					.userId(tmpUser.getUserId())
					.userProfile(AwsUtil.getImageURL(tmpUser.getProfile().getProfilePhoto()))
					.build();
			followerList.add(user);
		});
		
		return followerList;
	}
}

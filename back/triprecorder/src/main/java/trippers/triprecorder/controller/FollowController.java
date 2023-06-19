package trippers.triprecorder.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.entity.FollowVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.FollowRepository;
import trippers.triprecorder.repository.UserRepository;
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
}

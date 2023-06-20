package trippers.triprecorder.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.ProfileDto;
import trippers.triprecorder.dto.ProfileUpdateDto;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.FollowRepository;
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
	
	// 사용자 프로필 조회
	@GetMapping("/{userNo}")
	public ProfileDto getUserProfile(HttpServletRequest request, @PathVariable Long userNo) {
		String obj = request.getHeader("Authorization");
		UserVO user = urepo.findById(userNo).orElse(null);
		Integer following = frepo.findByFollower(user).size();
		Integer follower = frepo.findByFollowing(user).size();
		// 팔로잉하지 않은 상태
		Integer isFollowing = -1;
		
		if(obj != null) {
			Long loginNo = EncodingUtil.getUserNo(request);
			// 내 계정일 때
			if(userNo == loginNo) isFollowing = 0;
			// 팔로잉중
			else if (frepo.findByFollowing(user).size() != 0) isFollowing = 1;
		}
		
		ProfileDto profile = ProfileDto.builder()
				.userNo(user.getUserNo())
				.userNick(user.getUserNick())
				.profilePhoto(AwsUtil.getImageURL(user.getProfile().getProfilePhoto()))
				.profileMsg(user.getProfile().getProfileMsg())
				.userLevel(user.getUserLevel())
				.follower(follower)
				.following(following)
				.isFollowing(isFollowing)
				.build();
		
		return profile;
	}
	// 사용자 프로필 수정
    @GetMapping("/{userNo}")
    public ProfileDto updateUserProfile(@PathVariable Long userNo, @RequestBody ProfileUpdateDto updateDto) {
        UserVO user = urepo.findById(userNo).orElse(null);
        if (user == null) {
            // 사용자를 찾지 못한 경우 예외 처리
            // 예: throw new NotFoundException("User not found");
        }
        
        // 수정할 프로필 정보 업데이트
//        user.setUserName(updateDto.getUserName());
//        user.setUserGender(updateDto.getUserGender());
//        user.setUserNick(updateDto.getUserNick());
//        user.setUserEmail(updateDto.getUserEmail());
//        user.setUserPw(updateDto.getUserPw());
//        user.getProfile().setProfilePhoto(updateDto.getProfilePhoto());
//        user.getProfile().setProfileMsg(updateDto.getProfileMsg());
        
        UserVO updatedUser = urepo.save(user); // 수정된 사용자 정보 저장
        
        // 수정된 프로필 정보를 포함한 ProfileDto 반환
        ProfileDto profile = ProfileDto.builder()
                .userNo(updatedUser.getUserNo())
                .userNick(updatedUser.getUserNick())
                .profilePhoto(AwsUtil.getImageURL(updatedUser.getProfile().getProfilePhoto()))
                .profileMsg(updatedUser.getProfile().getProfileMsg())
                .userLevel(updatedUser.getUserLevel())
                .follower(frepo.findByFollowing(updatedUser).size())
                .following(frepo.findByFollower(updatedUser).size())
                .build();
        
        return profile;
    }
	
}

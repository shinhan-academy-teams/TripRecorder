package trippers.triprecorder.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.ReplyDto;
import trippers.triprecorder.dto.UserSimpleDto;
import trippers.triprecorder.entity.ProfileVO;
import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.ProfileRepository;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.EncodingUtil;

@RestController
@RequestMapping("/reply")
public class ReplyController {
	@Autowired
	UserRepository urepo;
	@Autowired
	SnsRepository srepo;
	@Autowired
	ReplyRepository rrepo;
	@Autowired
	ProfileRepository prepo;
	
	// 댓글 등록
	@PostMapping("/register/{snsNo}")
	public ReplyDto postRegisterReply(HttpServletRequest request, @RequestBody ReplyVO reply, @PathVariable Long snsNo) {
		Long userNo = EncodingUtil.getUserNo(request);
		UserVO user = urepo.findById(userNo).orElse(null);
		reply.setUser(user);
		reply.setSns(srepo.findById(snsNo).orElse(null));
		ReplyVO savedReply = rrepo.save(reply);
		
		ProfileVO profile = prepo.findById(userNo).orElse(null);
		UserSimpleDto myUser = UserSimpleDto.builder()
				.userNo(userNo)
				.userNick(user.getUserNick())
				.userProfile(AwsUtil.getImageURL(profile.getProfilePhoto()))
				.build();
		
		ReplyDto myReply = ReplyDto.builder()
				.snsNo(savedReply.getSns().getSnsNo())
				.replyNo(savedReply.getReplyNo())
				.replyContent(savedReply.getReplyContent())
				.replyRegdate(savedReply.getReplyRegdate())
				.replyUser(myUser)
				.build();
		
		return myReply;
	}
	
	// 댓글 삭제
	@DeleteMapping("/delete/{replyNo}")
	public String deleteReply(@PathVariable Long replyNo) {
		rrepo.findById(replyNo).ifPresent(reply -> rrepo.delete(reply));
		return "OK";
	}
}

package trippers.triprecorder.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.ReplyDto;
import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.UserRepository;
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
	
	@PostMapping("/register/{snsNo}")
	public ReplyDto postRegisterReply(HttpServletRequest request, @RequestBody ReplyVO reply, @PathVariable Long snsNo) {
		Long userNo = EncodingUtil.getUserNo(request);
		reply.setUser(urepo.findById(userNo).orElse(null));
		reply.setSns(srepo.findById(snsNo).orElse(null));
		ReplyVO savedReply = rrepo.save(reply);
		
		ReplyDto myReply = ReplyDto.builder()
				.userNo(savedReply.getUser().getUserNo())
				.snsNo(savedReply.getSns().getSnsNo())
				.replyNo(savedReply.getReplyNo())
				.replyContent(savedReply.getReplyContent())
				.replyRegdate(savedReply.getReplyRegdate())
				.build();
		return myReply;
	}
}

package trippers.triprecorder;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.UserRepository;

@SpringBootTest
public class ReplyTest {
	@Autowired
	SnsRepository srepo;
	@Autowired
	ReplyRepository rrepo;
	@Autowired
	UserRepository urepo;
	
	@Test
	void registerReply() {
		SnsVO sns = srepo.findById(66L).orElse(null);
		UserVO user = urepo.findById(19L).orElse(null);
		
		ReplyVO reply = ReplyVO.builder().replyContent("댓글1").sns(sns).user(user).build();
		
		rrepo.save(reply);
	}
}

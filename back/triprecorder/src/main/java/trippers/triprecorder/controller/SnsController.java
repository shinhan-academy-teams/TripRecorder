package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import trippers.triprecorder.dto.HashtagDto;
import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.dto.ReplyDto;
import trippers.triprecorder.dto.SnsDto;
import trippers.triprecorder.dto.UserSimpleDto;
import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.ExpRepository;
import trippers.triprecorder.repository.HashtagRepository;
import trippers.triprecorder.repository.HeartRepository;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;

@RestController
@RequestMapping("/sns")
public class SnsController {
	@Autowired
	TripRepository trepo;
	@Autowired
	SnsRepository srepo;
	@Autowired
	ExpRepository erepo;
	@Autowired
	UserRepository urepo;
	@Autowired
	ReplyRepository rrepo;
	@Autowired
	HeartRepository hrepo;
	@Autowired
	HashtagRepository tagrepo;

	// sns 게시글 등록 페이지 진입
	// 로그인 후 진입 가능
	@GetMapping("/register")
	public void getRegisterSns() {

	}

	// 게시글 등록
	@PostMapping("/register")
	public String postRegisterSns(@RequestBody ObjectNode obj) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Long tripNo = obj.get("tripNo").asLong();
		Long expNo = obj.get("expNo").asLong();
		List<String> hashtag = mapper.treeToValue(obj.get("hashtag"), List.class);
		SnsVO sns = mapper.treeToValue(obj.get("sns"), SnsVO.class);

		List<HashtagVO> tagList = new ArrayList<>();

		for (String tag : hashtag) {
			HashtagVO t = HashtagVO.builder().htHashtag("#" + tag).sns(sns).build();
			tagList.add(t);
		}

		if (tagList.size() > 0) {
			sns.setHashtag(tagList);
		}

		trepo.findById(tripNo).ifPresent(trip -> sns.setSns(trip));
		if (sns.getSnsContent().equals("")) {
			sns.setSnsContent(null);
		}

		SnsVO savedSns = srepo.save(sns);
		erepo.findById(expNo).ifPresent(exp -> {
			exp.setSns(savedSns);
			erepo.save(exp);
		});

		return "OK";
	}
	
	// 게시글 조회
	@GetMapping("/list")
	public List<SnsDto> getSnsList(HttpServletRequest request) {
		String obj = (String)request.getAttribute("Authorization");
		System.out.println("헤더 있음: " + obj);
		
		List<SnsVO> tmpSnsList = srepo.findAll();
		
		JSONObject snsObj = new JSONObject();
		List<SnsDto> snsList = new ArrayList<>();
		
		tmpSnsList.forEach(tmpSns -> {
			SnsDto sns = SnsDto.builder()
					.tripNo(tmpSns.getSns().getTripNo())
					.snsNo(tmpSns.getSnsNo())
					.snsTitle(tmpSns.getSnsTitle())
					.snsContent(tmpSns.getSnsContent())
					.snsPhoto(getSnsImages(tmpSns.getSnsPhoto()))
					.snsRegdate(tmpSns.getSnsRegdate())
					.snsUser(getAnyUser(tmpSns.getSns().getUser().getUserNo()))
					.reply(getSnsReply(tmpSns))
					.heart(getSnsHeart(tmpSns, tmpSns.getSns().getUser().getUserNo()))
					.hashtag(getSnsHashtag(tmpSns))
					.build();
			

			if(tmpSns.getExp() != null) {
				sns.setExpNo(tmpSns.getExp().getExpNo());
			}
			
			snsList.add(sns);
		});
		
		
		return snsList;
	}
	
	// 연결된 경비가 없는 게시글 조회
	@PostMapping("/list/{tripNo}")
	public List<JSONObject> postSnsList(@PathVariable Long tripNo) {
		TripVO trip = trepo.findById(tripNo).orElse(null);
		List<SnsVO> tmpSnsList = srepo.findBySnsAndExpNull(trip);
		
		List<JSONObject> snsList = new ArrayList<>();
		tmpSnsList.forEach(sns -> {
			JSONObject obj = new JSONObject();
			obj.put("snsNo", sns.getSnsNo());
			obj.put("snsTitle", sns.getSnsTitle());
			snsList.add(obj);
		});
		
		return snsList;
	}
	
	// 게시글 이미지 주소로 가져오기 
	private String getSnsImages(String snsPhoto) {
		String photo = "";
		String[] images = snsPhoto.split("@");
		for(int i = 0; i < images.length; i++) {
			photo += AwsUtil.getImageURL(images[i]);
			if(i != images.length - 1) {
				photo += "@";
			}
		}
		
		return photo;
	}
	
	// 작성자 가져오기
	private UserSimpleDto getAnyUser(Long userNo) {
		UserVO tmpUser = urepo.findById(userNo).orElse(null);
		
		UserSimpleDto user = UserSimpleDto.builder()
				.userNo(tmpUser.getUserNo())
				.userNick(tmpUser.getUserNick())
				.userProfile(AwsUtil.getImageURL(tmpUser.getProfile().getProfilePhoto()))
				.build();
		return user;
	}
	
	// 게시글 댓글 가져오기
	private List<ReplyDto> getSnsReply(SnsVO sns) {
		List<ReplyVO> tmpReplyList = rrepo.findBySns(sns);
		
		List<ReplyDto> replyList = new ArrayList<>();
		tmpReplyList.forEach(tmpReply -> {
			ReplyDto reply = ReplyDto.builder()
					.snsNo(sns.getSnsNo())
					.replyNo(tmpReply.getReplyNo())
					.replyContent(tmpReply.getReplyContent())
					.replyRegdate(tmpReply.getReplyRegdate())
					.replyUser(getAnyUser(tmpReply.getUser().getUserNo()))
					.build();
			replyList.add(reply);
		});
		
		return replyList;
	}
	
	// 게시글 좋아요 여부 가져오기
	private boolean getSnsHeart(SnsVO sns, Long userNo) {
		MultiKey key = MultiKey.builder()
				.sns(sns.getSnsNo())
				.user(userNo)
				.build();
		return hrepo.findById(key).orElse(null) != null;
	}
	
	// 게시글 해시태그 가져오기
	private List<HashtagDto> getSnsHashtag(SnsVO sns) {
		List<HashtagVO> tmpHashtagList = tagrepo.findBySns(sns);
		
		List<HashtagDto> tagList = new ArrayList<>();
		tmpHashtagList.forEach(tmpHashtag -> {
			HashtagDto hashtag = HashtagDto.builder()
					.htNo(tmpHashtag.getHtNo())
					.htHashtag(tmpHashtag.getHtHashtag())
					.build();
			tagList.add(hashtag);
		});
		
		return tagList;
	}
}

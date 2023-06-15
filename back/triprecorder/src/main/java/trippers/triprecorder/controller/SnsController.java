package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.repository.ExpRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;

@RestController
@RequestMapping("/sns")
public class SnsController {
	@Autowired
	TripRepository trepo;
	@Autowired
	SnsRepository srepo;
	@Autowired
	ExpRepository erepo;

	// sns 게시글 등록 페이지 진입
	// 로그인 후 진입 가능
	@GetMapping("/register")
	public void getRegisterSns() {

	}

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

		if (tagList.size() > 1) {
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
}

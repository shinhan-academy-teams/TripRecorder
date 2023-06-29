package trippers.triprecorder.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.entity.HeartVO;
import trippers.triprecorder.repository.HeartRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.EncodingUtil;

@RestController
@RequestMapping("/heart")
public class HeartController {
	@Autowired
	HeartRepository hrepo;
	@Autowired
	UserRepository urepo;
	@Autowired
	SnsRepository srepo;

	// 좋아요 등록 및 취소
	@PostMapping("/register/{snsNo}")
	public boolean postRegisterHeart(HttpServletRequest request, @PathVariable Long snsNo) {
		Long userNo = EncodingUtil.getUserNo(request);
		boolean result = true;

		MultiKey key = MultiKey.builder().user(userNo).sns(snsNo).build();
		HeartVO heart = hrepo.findById(key).orElse(null);

		if (heart == null) {
			HeartVO h = HeartVO.builder().user(urepo.findById(userNo).orElse(null))
					.sns(srepo.findById(snsNo).orElse(null)).build();
			hrepo.save(h);
		} else {
			hrepo.delete(heart);
			result = false;
		}

		return result;
	}
}

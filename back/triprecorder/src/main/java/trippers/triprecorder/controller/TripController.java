package trippers.triprecorder.controller;

import java.sql.Timestamp;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.TripRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.EncodingUtil;
import trippers.triprecorder.util.JsonUtil;

@RestController
@RequestMapping("/trip")
public class TripController {
	@Autowired
	UserRepository urepo;
	@Autowired
	TripRepository trepo;
	
	// 여행 카테고리 등록 페이지 진입
	// 로그인 후 진입 가능
	@GetMapping("/registertrip")
	public void getRegisterTrip() {
		
	}
	
	// 여행 카테고리 등록
	@PostMapping("/registertrip") 
	public TripVO postRegisterTrip(HttpServletRequest request, @RequestBody TripVO trip) {
		String jwt = request.getHeader("Authorization");
		String decodeStr = EncodingUtil.getDecodedStr(jwt.replace('.', '@').split("@")[1]);
		JSONObject jsonObj = JsonUtil.getStringToJsonObj(decodeStr);
		Long userNo = (Long) jsonObj.get("userno");
		System.out.println(userNo);
		
		UserVO user = urepo.findById(userNo).orElse(null);
		trip.setUser(user);
		
		trepo.save(trip);
		return trip;
	}
}
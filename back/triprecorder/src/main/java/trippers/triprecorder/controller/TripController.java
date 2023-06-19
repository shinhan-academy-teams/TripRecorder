package trippers.triprecorder.controller;

import java.net.MulticastSocket;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.EncodingUtil;

@RestController
@RequestMapping("/trip")
public class TripController {
	@Autowired
	UserRepository urepo;
	@Autowired
	TripRepository trepo;
	@Autowired
	SnsRepository srepo;
	
	// 여행 카테고리 등록
	@PostMapping("/register") 
	public String postRegisterTrip(HttpServletRequest request, @RequestBody TripVO trip) {
		Long userNo = EncodingUtil.getUserNo(request);
//		Long userNo = 1L;
		
		UserVO user = urepo.findById(userNo).orElse(null);
		trip.setUser(user);
		
		trepo.save(trip);
		return "OK";
	}
	
	// 여행 카테고리 리스트
	@GetMapping("/list/{userNo}")
	public List<JSONObject> getTripList(@PathVariable Long userNo) {
		List<JSONObject> tripList = new ArrayList<>();
		UserVO user = urepo.findById(userNo).orElse(null);
		
		trepo.findByUser(user, Sort.by(Direction.DESC, "tripNo")).forEach(trip -> {
			JSONObject obj = new JSONObject();
			obj.put("tripNo", trip.getTripNo());				
			obj.put("tripName", trip.getTripName());
			
			List<SnsVO> tmpTripList = srepo.findBySnsOrderBySnsNoDesc(trip);
			String firstImg = "sns/default_thumbnail.png";
			if(tmpTripList.size() != 0) {
				SnsVO sns = tmpTripList.get(0);
				String imgKey = sns.getSnsPhoto().split("@")[0];
				firstImg = AwsUtil.getImageURL(imgKey);
			} else {
				firstImg = AwsUtil.getImageURL(firstImg);
			}

			obj.put("thumbnail", firstImg);
			tripList.add(obj);
		});
		
		return tripList;
	}
}

package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import trippers.triprecorder.entity.ExpVO;
import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.repository.CardRepository;
import trippers.triprecorder.repository.ExpRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;

@RestController
@RequestMapping("/exp")
public class ExpController {
    @Autowired
    ExpRepository erepo;
    @Autowired
    TripRepository trepo;
    @Autowired
    SnsRepository srepo;
    @Autowired
    CardRepository crepo;


    //경비등록
    @PostMapping("/register")
    public String ocr(@RequestBody ObjectNode obj) throws JsonProcessingException {
    	ObjectMapper mapper = new ObjectMapper();
		Long tripNo = obj.get("tripNo").asLong();
		Long snsNo = obj.get("snsNo").asLong();
		Long cardNo = obj.get("cardNo").asLong();

		ExpVO exp = mapper.treeToValue(obj.get("exp"), ExpVO.class);
		
		trepo.findById(tripNo).ifPresent(trip -> exp.setTrip(trip));
		srepo.findById(snsNo).ifPresent(sns -> exp.setSns(sns));
		crepo.findById(cardNo).ifPresent(card -> exp.setCard(card));
		
		erepo.save(exp);
		
		return "OK";
    }
    
    
    
    //경비수정
    @PutMapping("/updateexp/{expNo}")
    public String updateOcrData(@PathVariable Long expNo, @RequestBody ExpVO exp) {

    	ExpVO existingExp = erepo.findByExpNo(expNo);
        if (existingExp == null) {
            return "ExpVO with ID " + expNo + " not found";
        }

        exp.setExpNo(expNo); 
        ExpVO updatedExp = erepo.save(exp); 
        
        if (updatedExp != null) {
            return "수정완료";
        } else {
            return "수정실패";
        }
    }
    
    // 연결된 게시글이 없는 경비 조회
    @PostMapping("/list/{tripNo}")
    public List<JSONObject> postExpList(@PathVariable Long tripNo) {
    	TripVO trip = trepo.findById(tripNo).orElse(null);
    	List<ExpVO> tmpExpList = erepo.findByTripAndSnsNull(trip);
    	
    	List<JSONObject> expList = new ArrayList<>();
    	tmpExpList.forEach(exp -> {
			JSONObject obj = new JSONObject();
			obj.put("expNo", exp.getExpNo());
			obj.put("expTitle", exp.getExpTitle());
			expList.add(obj);
		});
    	
    	return expList;
    }
    
    // 게시글과 연동된 경비 정보
    @PostMapping("/sns/{expNo}")
    public JSONObject postExpWithSns(@PathVariable Long expNo) {
    	ExpVO tmpExp = erepo.findById(expNo).orElse(null);
    	
    	JSONObject exp = new JSONObject();
    	exp.put("expTitle", tmpExp.getExpTitle());
    	exp.put("expPlace", tmpExp.getExpPlace());
    	exp.put("expMoney", tmpExp.getExpMoney());
    	
    	return exp;
    }
    
}

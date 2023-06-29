package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mysql.cj.x.protobuf.MysqlxCrud.Order.Direction;

import trippers.triprecorder.dto.ExpInfoDto;
import trippers.triprecorder.dto.ExpSimpleDto;
import trippers.triprecorder.entity.ExpVO;
import trippers.triprecorder.entity.SnsVO;
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

	// 경비등록
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

	// 연결된 게시글이 없는 경비 조회
	@PostMapping("/list/{tripNo}")
	public List<JSONObject> postExpList(@PathVariable Long tripNo) {
		TripVO trip = trepo.findById(tripNo).orElse(null);
		List<ExpVO> tmpExpList = erepo.findByTripAndSnsNullOrderByExpNoDesc(trip);

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
		exp.put("expNo", tmpExp.getExpNo());

		return exp;
	}

	// 경비 리스트
	@GetMapping("/{tripNo}/list")
	public JSONObject getExpList(@PathVariable Long tripNo) {
		TripVO trip = trepo.findById(tripNo).orElse(null);
		List<ExpVO> tmpExp = erepo.findByTrip(trip, Sort.by("expTime"));

		List<ExpSimpleDto> expList = new ArrayList<>();
		Long tripExp = trepo.findById(tripNo).orElse(null).getTripExp();
		Long useExp = 0L;

		for (int i = 0; i < tmpExp.size(); i++) {
			ExpVO exp = tmpExp.get(i);

			ExpSimpleDto e = ExpSimpleDto.builder().expNo(exp.getExpNo()).expTitle(exp.getExpTitle())
					.expPlace(exp.getExpPlace()).expMoney(exp.getExpMoney()).expTime(exp.getExpTime()).build();

			expList.add(e);
			useExp += exp.getExpMoney();
		}

		JSONObject expObj = new JSONObject();
		expObj.put("tripExp", tripExp);
		expObj.put("useExp", useExp);
		expObj.put("remainExp", (tripExp - useExp));
		expObj.put("exp", expList);
		return expObj;
	}

	// 경비 상세보기
	@GetMapping("/detail/{expNo}")
	public ExpInfoDto getExpDetail(@PathVariable Long expNo) {
		ExpVO tmpExp = erepo.findById(expNo).orElse(null);
		ExpInfoDto exp = ExpInfoDto.builder().expNo(tmpExp.getExpNo()).expTitle(tmpExp.getExpTitle())
				.tripNo(tmpExp.getTrip().getTripNo()).expPlace(tmpExp.getExpPlace()).expAddress(tmpExp.getExpAddress())
				.expMoney(tmpExp.getExpMoney()).expTime(tmpExp.getExpTime()).expWay(tmpExp.getExpWay())
				.expCate(tmpExp.getExpCate()).build();

		if (tmpExp.getCard() != null) {
			exp.setCardNo(tmpExp.getCard().getCardNo());
		}
		if (tmpExp.getSns() != null) {
			exp.setSnsNo(tmpExp.getSns().getSnsNo());
		}

		return exp;
	}

	// 경비 삭제
	@DeleteMapping("/delete/{expNo}")
	public String deleteExp(@PathVariable Long expNo) {
		erepo.deleteById(expNo);
		return "OK";
	}
}

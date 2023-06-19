package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import trippers.triprecorder.entity.CardVO;
import trippers.triprecorder.entity.DiscountVO;
import trippers.triprecorder.entity.ExpVO;
import trippers.triprecorder.repository.CardRepository;
import trippers.triprecorder.repository.DiscountRepository;
import trippers.triprecorder.repository.ExpRepository;

@RestController
@RequestMapping("/card")
public class CardController {
	@Autowired
	CardRepository crepo;

	@Autowired
	ExpRepository erepo;

	@Autowired
	DiscountRepository drepo;

	// 모든 카드 조회
	@PostMapping("/list")
	public List<CardVO> getCardList() {
		List<CardVO> cardList = crepo.findAll(Sort.by(Direction.ASC, "cardName"));
		return cardList;
	}

	// 특정 카테고리에 속하는 카드번호 중 개수가 가장 많은 상위 3개 조회
	@GetMapping("/topcard")
	public List<List<ExpVO>> getTopCardList() {

		List<List<ExpVO>> result = new ArrayList<>();

		List<ExpVO> topCardList = erepo.findTop3CardNumbersByExpCate("숙박");

		List<ExpVO> topCardList2 = erepo.findTop3CardNumbersByExpCate("항공");

		List<ExpVO> topCardList3 = erepo.findTop3CardNumbersByExpCate("교통");

		List<ExpVO> topCardList4 = erepo.findTop3CardNumbersByExpCate("외식");

		List<ExpVO> topCardList5 = erepo.findTop3CardNumbersByExpCate("관광");

		List<ExpVO> topCardList6 = erepo.findTop3CardNumbersByExpCate("쇼핑");

		result.add(topCardList);
		result.add(topCardList2);
		result.add(topCardList3);
		result.add(topCardList4);
		result.add(topCardList5);
		return result;
	}

	// 카드에 해당하는 혜택 조회
	@PostMapping("/carddiscount")
	public List<DiscountVO> getCardDiscountList(@RequestBody ObjectNode obj) {
		Long cardNo = obj.get("cardNo").asLong();

		List<DiscountVO> cardDiscountList = drepo.findByCardNo(cardNo);
		return cardDiscountList;
	}

}

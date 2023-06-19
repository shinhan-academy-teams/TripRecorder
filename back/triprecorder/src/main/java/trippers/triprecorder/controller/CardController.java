package trippers.triprecorder.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import trippers.triprecorder.dto.CardDto;
import trippers.triprecorder.dto.DiscountDto;
import trippers.triprecorder.entity.CardVO;
import trippers.triprecorder.entity.DiscountVO;
import trippers.triprecorder.repository.CardRepository;
import trippers.triprecorder.repository.DiscountRepository;
import trippers.triprecorder.repository.ExpRepository;
import trippers.triprecorder.util.JsonUtil;

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
	public List<CardDto> getTopCardList(@RequestBody JSONObject obj) {

		List<Object> tmpCardList = erepo.findTop3CardNumbersByExpCate(obj.get("category").toString());
		System.out.println(tmpCardList);
		List<CardDto> topCardList = new ArrayList<>();

		tmpCardList.forEach(cardObj -> {

			String str = "";
			try {
				str = JsonUtil.getObjectToJsonString(cardObj);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			str = str.replace("[", "").replace("]", "").split(",")[0];
			CardVO tmpCard = crepo.findById(Long.valueOf(str)).orElse(null);

			CardDto card = CardDto.builder().cardNo(tmpCard.getCardNo()).cardName(tmpCard.getCardName())
					.cardPhoto(tmpCard.getCardPhoto()).cardAnnual(tmpCard.getCardAnnual()).build();

			topCardList.add(card);
		});
		return topCardList;
	}

	// 카드에 해당하는 혜택 조회
	@PostMapping("/carddiscount")
	public List<DiscountDto> getCardDiscountList(@RequestBody JSONObject obj) {
		Long cardNo = Long.valueOf(obj.get("cardNo").toString());

		CardVO card = crepo.findByCardNo(cardNo);
		List<DiscountVO> discountList = drepo.findByCard(card);

		List<DiscountDto> discountDtoList = new ArrayList<>();
		for (DiscountVO discount : discountList) {
			
		}

		return discountDtoList;
	}

}

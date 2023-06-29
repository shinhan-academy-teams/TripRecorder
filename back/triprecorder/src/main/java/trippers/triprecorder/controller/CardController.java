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
	@PostMapping("/topcard")
	public List<CardDto> getTopCardList(@RequestBody JSONObject obj) {

		List<Object> tmpCardList = erepo.findTop3CardNumbersByExpCate(obj.get("category").toString());

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
					.cardPhoto(tmpCard.getCardPhoto()).cardAnnual(tmpCard.getCardAnnual())
					.cardLink(tmpCard.getCardLink()).build();

			topCardList.add(card);
		});
		return topCardList;
	}

	// 카드에 해당하는 혜택 조회
	@PostMapping("/carddiscount")
	public List<DiscountDto> getCardDiscountList(@RequestBody JSONObject obj) {
		Long price = Long.valueOf(obj.get("price").toString());

		Object cards = obj.get("cardNo");

		String category = obj.get("category").toString();

		ArrayList<Integer> cardNoList = (ArrayList<Integer>) cards;

		ArrayList<CardVO> cardList = new ArrayList<>();

		cardNoList.forEach(cardNo -> {
			CardVO card = crepo.findById(Long.valueOf(cardNo)).orElse(null);
			cardList.add(card);
		});

		List<DiscountVO> dcList = drepo.findByDcCateAndCardIn(category, cardList);

		List<DiscountDto> dcResult = new ArrayList<>();

		cardList.forEach(card -> {
			boolean loop = false;
			for (int i = 0; i < dcList.size(); i++) {
				DiscountVO dc = dcList.get(i);

				if (dc.getCard().getCardNo() == card.getCardNo()) {
					dcResult.add(createDiscountDto(dc, price));
					loop = true;
					break;
				}
			}

			// 해당 카테고리에 대한 혜택이 없는 카드인 경우
			if (!loop) {
				DiscountDto dto = DiscountDto.builder().annual(Long.valueOf(card.getCardAnnual()))
						.totalDiscountAmount(0L).build();

				dcResult.add(dto);
			}
		});

		return dcResult;
	}

	// 혜택, 연회비 적용 메서드
	private DiscountDto createDiscountDto(DiscountVO discountVO, Long price) {

		CardVO card = discountVO.getCard();
		DiscountDto ddto = new DiscountDto();
		Long discountAmount = null;

		if (discountVO.getDcDiscount().equals("할인")) {
			if (discountVO.getDcWay().equals("pct")) {
				discountAmount = (long) Math.round(price * discountVO.getDcAmount() / 100);
			} else {
				discountAmount = (long) Math.round(discountVO.getDcAmount());
			}
			ddto.setDiscountAmount(discountAmount);
			ddto.setTotalDiscountAmount(discountAmount);// 더할거 있으면 더하고
		} else if (discountVO.getDcDiscount().equals("캐시백")) {
			if (discountVO.getDcWay().equals("pct")) {
				discountAmount = (long) Math.round(price * discountVO.getDcAmount() / 100);
			} else {
				discountAmount = (long) Math.round(discountVO.getDcAmount());
			}
			ddto.setPayback(discountAmount);
			ddto.setTotalDiscountAmount(discountAmount);// 더할거 있으면 더하고
		} else if (discountVO.getDcDiscount().equals("포인트")) {
			if (discountVO.getDcWay().equals("pct")) {
				discountAmount = (long) Math.round(price * discountVO.getDcAmount() / 100);
			} else {
				discountAmount = (long) Math.round(discountVO.getDcAmount());
			}
			ddto.setPoint(discountAmount);
			ddto.setTotalDiscountAmount(discountAmount);// 더할거 있으면 더하고
		}
		ddto.setAnnual(Long.parseLong(card.getCardAnnual()));

		return ddto;
	}
}

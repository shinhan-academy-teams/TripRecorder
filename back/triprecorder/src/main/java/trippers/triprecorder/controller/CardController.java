package trippers.triprecorder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.entity.CardVO;
import trippers.triprecorder.repository.CardRepository;

@RestController
@RequestMapping("/card")
public class CardController {
	@Autowired
	CardRepository crepo;
	
	// 모든 카드 조회
	@PostMapping("/list") 
	public List<CardVO> getCardList() {
		List<CardVO> cardList = crepo.findAll();
		return cardList;
	}
}

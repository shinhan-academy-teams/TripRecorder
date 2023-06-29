package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardDto {
	// 카드
	private Long cardNo;
	private String cardName;
	private String cardPhoto;
	private String cardAnnual;
	private String cardLink;
}

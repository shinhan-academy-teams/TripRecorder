package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardDto {
	private Long cardNo;
	private String cardName;
	private String cardPhoto;
	private String cardAnnual;

}

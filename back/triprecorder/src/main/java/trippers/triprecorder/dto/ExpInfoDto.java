package trippers.triprecorder.dto;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExpInfoDto {
	private Long expNo;
	private String expTitle;
	
	private Long cardNo; 
	private Long tripNo;
	private Long snsNo; 
	
	private String expPlace;
	private String expAddress;
	private Long expMoney;
	private Timestamp expTime;
	private String expWay;
	private String expCate;
}

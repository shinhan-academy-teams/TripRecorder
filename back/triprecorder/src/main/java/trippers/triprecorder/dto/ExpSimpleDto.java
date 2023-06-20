package trippers.triprecorder.dto;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExpSimpleDto {
	private Long expNo;
	private String expTitle;
	private String expPlace;
	private Long expMoney;
	private Timestamp expTime;
}

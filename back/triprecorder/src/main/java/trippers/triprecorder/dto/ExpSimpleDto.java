package trippers.triprecorder.dto;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExpSimpleDto {
	// 간단한 경비
	private Long expNo;
	private String expTitle;
	private String expPlace;
	private Long expMoney;
	private Timestamp expTime;
}

package trippers.triprecorder.dto;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReplyDto {
	private Long snsNo;

	private Long replyNo;
	private String replyContent;
	private Timestamp replyRegdate;
	
	private UserSimpleDto replyUser;
}

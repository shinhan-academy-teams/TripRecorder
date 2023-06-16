package trippers.triprecorder.dto;

import java.sql.Timestamp;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SnsDto {
	private Long tripNo;
	private Long expNo;
	
	private Long snsNo;
	private String snsTitle;
	private String snsContent;
	private String snsPhoto;
	private Timestamp snsRegdate;
	private UserSimpleDto snsUser;
	
	private List<ReplyDto> reply;
	private boolean heart;
	private List<HashtagDto> hashtag;
}

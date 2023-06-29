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
	private List<String> snsPhoto;
	private Timestamp snsRegdate;
	private Integer snsScope;
	private UserSimpleDto snsUser;

	private List<ReplyDto> reply;
	private boolean isHeart;
	private Integer heartCnt;
	private List<String> hashtag;
}

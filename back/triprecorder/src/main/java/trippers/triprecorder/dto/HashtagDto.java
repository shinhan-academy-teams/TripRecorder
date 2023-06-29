package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class HashtagDto {
	// 해시태그
	private Long htNo;
	private String htHashtag;
}

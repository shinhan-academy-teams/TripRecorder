package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class HashtagDto {
	private Long htNo;
	private String htHashtag;
}

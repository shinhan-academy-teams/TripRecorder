package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSimpleDto {
	// front에게 전달할 로그인 정보 (nav bar에 들어갈 간단한 정보)
	// 간단
	private Long userNo;
	private String userNick;
	private String userId;
	private String userProfile;
}

package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginInfoDto {
	// front에게 전달할 로그인 정보 (nav bar에 들어갈 간단한 정보)
	private Long userNo;
	private String userNick;
	private String userProfile;
}

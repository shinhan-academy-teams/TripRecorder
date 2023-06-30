package trippers.triprecorder.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
	// 로그인 할 때
	private String userId;
	private String userPw;
}

package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HeaderInfoDto {
	// JWT 토큰에 저장된 사용자 정보 (json 형태로 가져가기 위해 object 타입으로 선언)
	private Object userNo;
	private Object uesrId;
	private Object userNick;
}

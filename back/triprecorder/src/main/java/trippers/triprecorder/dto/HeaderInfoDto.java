package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HeaderInfoDto {
	// JWT 토큰에 저장된 사용자 정보
	private Object userNo;
	private Object uesrId;
	private Object userNick;
}

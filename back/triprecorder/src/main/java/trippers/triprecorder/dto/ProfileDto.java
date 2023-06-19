package trippers.triprecorder.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDto {
	private Long userNo;
	private String userNick;
	private String profilePhoto;
	private String profileMsg;

	private String userLevel;
	private Integer follower;
	private Integer following;
}

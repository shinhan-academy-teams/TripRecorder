package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileUpdateDto {

	private String userName;
	private String userGender;
	private String userNick;
	private String userEmail;
	private String profilePhoto;
	private String profileMsg;
}

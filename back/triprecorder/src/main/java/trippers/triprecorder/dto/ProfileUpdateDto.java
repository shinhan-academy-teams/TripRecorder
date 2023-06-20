package trippers.triprecorder.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileUpdateDto {

	private String userNick;
}

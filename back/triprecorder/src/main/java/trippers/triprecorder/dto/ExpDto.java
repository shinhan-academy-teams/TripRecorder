package trippers.triprecorder.dto;

import java.sql.Timestamp;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExpDto {

	@JsonProperty("storeInfo")
	private String expPlace;

	@JsonProperty("addresses")
	private String expAddress;

	@JsonProperty("totalPrice")
	private Long expMoney;

	@JsonProperty("timestamp")
	private String expTime;
}

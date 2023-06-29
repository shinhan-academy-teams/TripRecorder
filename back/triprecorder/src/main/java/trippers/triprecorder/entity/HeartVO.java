package trippers.triprecorder.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import trippers.triprecorder.dto.MultiKey;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "heart")
@IdClass(MultiKey.class)
@ToString(exclude = { "user", "sns" })
public class HeartVO {
	@Id
	@ManyToOne
	@JoinColumn(name = "user_no")
	private UserVO user;
	@Id
	@ManyToOne
	@JoinColumn(name = "sns_no")
	private SnsVO sns;
}
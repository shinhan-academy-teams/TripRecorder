package trippers.triprecorder.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "profile")
@Getter @Setter @ToString(exclude = {"user"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileVO {
	@Id
	private Long profileNo;
	
	@MapsId
	@OneToOne
	@JoinColumn(name="user_no")
	UserVO user;
	
	@Column(nullable = false)
	@Builder.Default
	private String profilePhoto = "default_profile.png";
	private String profileMsg;
}
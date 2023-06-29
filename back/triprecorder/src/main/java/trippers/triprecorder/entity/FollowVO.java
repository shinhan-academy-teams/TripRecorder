package trippers.triprecorder.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "follow")
@Getter
@Setter
@ToString(exclude = { "follower", "following" })
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long followNo;

	// 팔로워 (follow를 누른 사람)
	@ManyToOne
	@JoinColumn(name = "follower")
	private UserVO follower;

	// 팔로우 (follow를 받은 사람)
	@ManyToOne
	@JoinColumn(name = "following")
	private UserVO following;

}
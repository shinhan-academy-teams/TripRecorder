package trippers.triprecorder.vo;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "follow")
@Getter @Setter @ToString(exclude = {"follower", "following"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long followNo;
	
	// ÆÈ·Î¿ö
	@ManyToOne
	@JoinColumn(name="follower")
	private UserVO follower;
	
	@ManyToOne
	@JoinColumn(name="following")
	private UserVO following;
	
}

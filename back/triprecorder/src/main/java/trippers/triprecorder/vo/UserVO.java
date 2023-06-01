package trippers.triprecorder.vo;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Getter @Setter @ToString(exclude = {"profile", "follower", "following", "trip", "reply", "heart"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userNo;
	@Column(nullable = false, unique = true)
	private String userId;
	@Column(nullable = false)
	private String userPw;
	@Column(nullable = false)
	private String userName;
	@Column(nullable = false, unique = true)
	private String userNick;
	@Column(nullable = false)
	private String userGender;
	@Builder.Default
	private String userLevel = "�����";
	@Column(nullable = false)
	private boolean isAdmin;
	
	// ������
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private ProfileVO profile;
	
	// �ȷο�
	@OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
	private List<FollowVO> follower;
	@OneToMany(mappedBy = "following", cascade = CascadeType.ALL)
	private List<FollowVO> following;
	
	// ����
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<TripVO> trip;
	
	// ���
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<ReplyVO> reply;
	
	// ���ƿ�
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<HeartVO> heart;
}

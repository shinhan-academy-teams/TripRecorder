package trippers.triprecorder.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import trippers.triprecorder.dto.Role;

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
	@Column(nullable = false, unique = true)
	private String userEmail;
	@Column(nullable = false)
	private String userGender;
	@Builder.Default
	@Column(columnDefinition = "VARCHAR(255) default '브론즈'")
	private String userLevel = "브론즈";
	@Enumerated(EnumType.STRING) 
	private Role userRole;
	
	// 프로필
	@JsonIgnore
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private ProfileVO profile;
	
	// 팔로워
	@JsonIgnore
	@OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
	private List<FollowVO> follower;
	@JsonIgnore
	@OneToMany(mappedBy = "following", cascade = CascadeType.ALL)
	private List<FollowVO> following;
	
	// 여행
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<TripVO> trip;
	
	// 댓글
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<ReplyVO> reply;
	
	// 좋아요
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<HeartVO> heart;
}
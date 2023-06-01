package trippers.triprecorder.vo;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "trip")
@Getter
@Setter
@ToString(exclude = {"user", "sns", "exp"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long tripNo;
	@ManyToOne
	@JoinColumn(name = "user_no")
	private UserVO user;
	@Column(nullable = false)
	private String tripName;
	@Column(nullable = false)
	private String tripDest;
	@Column(nullable = false)
	private Timestamp tripStart;
	@Column(nullable = false)
	private Timestamp tripEnd;
	@Column(nullable = false)
	private Long tripExp;
	
	// sns 게시글
	@OneToMany(mappedBy = "sns", cascade = CascadeType.ALL)
	private List<SnsVO> sns;
	
	// 여행 경비 (영수증)
	@OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
	private List<ExpVO> exp;
}

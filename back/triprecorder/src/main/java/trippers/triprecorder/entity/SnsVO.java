package trippers.triprecorder.entity;

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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "sns")
@Getter
@Setter
@ToString(exclude = { "sns", "reply", "heart", "hashtag", "exp" })
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnsVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long snsNo;
	@Column(nullable = false)
	private String snsTitle;
	@ManyToOne
	@JoinColumn(name = "trip_no")
	private TripVO sns;
	private String snsContent;
	@Column(nullable = false)
	private String snsPhoto;
	@CreationTimestamp
	private Timestamp snsRegdate;
	@Column(nullable = false)
	private Integer snsScope;

	// 댓글
	@JsonIgnore
	@OneToMany(mappedBy = "sns", cascade = CascadeType.ALL)
	private List<ReplyVO> reply;

	// 좋아요
	@JsonIgnore
	@OneToMany(mappedBy = "sns", cascade = CascadeType.ALL)
	private List<HeartVO> heart;

	// 해시태그
	@JsonIgnore
	@OneToMany(mappedBy = "sns", cascade = CascadeType.ALL)
	private List<HashtagVO> hashtag;

	// 여행 경비 (영수증)
	@JsonIgnore
	@OneToOne(mappedBy = "sns")
	private ExpVO exp;
}
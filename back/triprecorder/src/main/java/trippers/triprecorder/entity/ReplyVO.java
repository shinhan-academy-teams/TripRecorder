package trippers.triprecorder.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "reply")
@Getter
@Setter
@ToString(exclude = {"user", "sns"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long replyNo;
	@ManyToOne
	@JoinColumn(name = "user_no")
	private UserVO user;
	@ManyToOne
	@JoinColumn(name = "sns_no")
	private SnsVO sns;
	@Column(nullable = false)
	private String replyContent;
	@CreationTimestamp
	private Timestamp replyRegdate;
}
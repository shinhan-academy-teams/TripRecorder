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
@Table(name = "hashtag")
@Getter
@Setter
@ToString(exclude = { "sns" })
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HashtagVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long htNo;
	@ManyToOne
	@JoinColumn(name = "sns_no")
	private SnsVO sns;
	private String htHashtag;
}
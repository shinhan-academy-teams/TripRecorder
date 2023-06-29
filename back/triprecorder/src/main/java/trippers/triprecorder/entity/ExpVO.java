package trippers.triprecorder.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "exp")
@Getter
@Setter
@ToString(exclude = { "card", "trip", "sns" })
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long expNo;
	@Column(nullable = false)
	private String expTitle;
	@ManyToOne
	@JoinColumn(name = "card_no")
	private CardVO card; // null 처리 백엔드에서 필요
	@ManyToOne
	@JoinColumn(name = "trip_no")
	private TripVO trip;
	@OneToOne
	@JoinColumn(name = "sns_no")
	private SnsVO sns; // null 처리 백엔드에서 필요
	@Column(nullable = false)
	private String expPlace;
	@Column(nullable = false)
	private String expAddress;
	@Column(nullable = false)
	private Long expMoney;
	@Column(nullable = false)
	private Timestamp expTime;
	@Column(nullable = false)
	private String expWay;
	@Column(nullable = false)
	private String expCate;
}
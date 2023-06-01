package trippers.triprecorder.vo;

import javax.persistence.Column;
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
@Table(name = "dc")
@Getter
@Setter
@ToString(exclude = "card") 
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiscountVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long dcNo;
	@ManyToOne
	@JoinColumn(name = "card_no")
	private CardVO card;
	@Column(nullable = false)
	private String dcCate;
	private Integer dcDiscount;
	private Integer dcCashback;
	private Integer dcPoint;
}

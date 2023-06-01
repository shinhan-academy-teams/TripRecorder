package trippers.triprecorder.vo;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "card")
@Getter
@Setter
@ToString(exclude = {"dc", "exp"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long cardNo;
	@Column(nullable = false)
	private String cardBank;
	@Column(nullable = false)
	private String cardName;
	@Column(nullable = false)
	private String cardPhoto;
	
	// 할인정보
	@OneToMany(mappedBy = "card", cascade = CascadeType.ALL)
	private List<DiscountVO> dc;
	
	// 여행 경비 (영수증)
	@OneToOne(mappedBy = "card")
	private ExpVO exp;
}

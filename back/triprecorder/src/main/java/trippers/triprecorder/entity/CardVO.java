package trippers.triprecorder.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	private String cardName;
	@Column(nullable = false)
	private String cardPhoto;
	@Column(nullable = false)
	private String cardAnnual;
	@Column(nullable = false)
	private String cardLink;
	
	// 할인정보
	@JsonIgnore
	@OneToMany(mappedBy = "card", cascade = CascadeType.ALL)
	private List<DiscountVO> dc;
	
	// 여행 경비 (영수증)
	@JsonIgnore 
	@OneToMany(mappedBy = "card", fetch = FetchType.LAZY)
	private List<ExpVO> exp;
}
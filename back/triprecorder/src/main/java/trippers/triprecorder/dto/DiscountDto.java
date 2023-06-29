package trippers.triprecorder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountDto {

	private Long discountAmount;
	private Long payback;
	private Long point;
	private Long annual;
	private Long totalDiscountAmount;

	public Long getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(Long discountAmount) {
		this.discountAmount = discountAmount;
	}

	public Long getPayback() {
		return payback;
	}

	public void setPayback(Long payback) {
		this.payback = payback;
	}

	public Long getPoint() {
		return point;
	}

	public void setPoint(Long point) {
		this.point = point;
	}

	public Long getAnnual() {
		return annual;
	}

	public void setAnnual(Long annual) {
		this.annual = annual;
	}

	public Long getTotalDiscountAmount() {
		return totalDiscountAmount;
	}

	public void setTotalDiscountAmount(Long totalDiscountAmount) {
		this.totalDiscountAmount = totalDiscountAmount;
	}

}

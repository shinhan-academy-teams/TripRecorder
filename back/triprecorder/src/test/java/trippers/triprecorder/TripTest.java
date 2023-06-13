package trippers.triprecorder;

import java.sql.Timestamp;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.TripRepository;
import trippers.triprecorder.repository.UserRepository;

@SpringBootTest
public class TripTest {
	@Autowired
	UserRepository urepo;
	@Autowired
	TripRepository trepo;
	
	@Test
	void insertTrip() {
		Date date = new Date(2023, 5, 2);
		UserVO user = urepo.findById(12L).orElse(null);
		TripVO trip = TripVO.builder()
				.tripName("아주 신나는 여행")
				.tripDest("홍대")
				.tripStart(new Timestamp(date.getTime()))
				.tripEnd(new Timestamp(date.getTime()))
				.tripExp(1000000L)
				.user(user)
				.build();
		
		trepo.save(trip);
	}
}

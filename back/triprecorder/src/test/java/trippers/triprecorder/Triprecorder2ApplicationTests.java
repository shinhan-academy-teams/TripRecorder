package trippers.triprecorder;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Date;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import trippers.triprecorder.repository.CardRepository;
import trippers.triprecorder.repository.DiscountRepository;
import trippers.triprecorder.repository.ExpRepository;
import trippers.triprecorder.repository.FollowRepository;
import trippers.triprecorder.repository.HashtagRepository;
import trippers.triprecorder.repository.HeartRepository;
import trippers.triprecorder.repository.ProfileRepository;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;
import trippers.triprecorder.repository.UserRepository;
import trippers.triprecorder.vo.CardVO;
import trippers.triprecorder.vo.DiscountVO;
import trippers.triprecorder.vo.ExpVO;
import trippers.triprecorder.vo.FollowVO;
import trippers.triprecorder.vo.HashtagVO;
import trippers.triprecorder.vo.HeartVO;
import trippers.triprecorder.vo.ProfileVO;
import trippers.triprecorder.vo.ReplyVO;
import trippers.triprecorder.vo.SnsVO;
import trippers.triprecorder.vo.TripVO;
import trippers.triprecorder.vo.UserVO;

@SpringBootTest
class Triprecorder2ApplicationTests {
	@Autowired
	UserRepository urepo;
	@Autowired
	ProfileRepository prepo;
	@Autowired
	FollowRepository frepo;
	@Autowired
	TripRepository trepo;
	@Autowired
	SnsRepository srepo;
	@Autowired
	ReplyRepository rrepo;
	@Autowired
	HeartRepository hrepo;
	@Autowired
	HashtagRepository tagRepo;
	@Autowired
	CardRepository crepo;
	@Autowired
	DiscountRepository drepo;
	@Autowired
	ExpRepository erepo;

//	@Test
	void aa() {
		System.out.println("���̺� �����~");
	}
	
//	@Test
	void testReoveTrip() {
		trepo.deleteById(51L);
	}
//	@Test
	void testRemoveSns() {
		srepo.deleteById(53L);
	}

//	@Test
	void testRemoveUser() {
		urepo.deleteById(5L);
	}
	
	
//	@Test
	void test1UserVO() {
		IntStream.rangeClosed(5, 50).forEach(idx -> {
			ProfileVO profile = ProfileVO.builder().build();
			UserVO user = UserVO.builder().userGender("��")
					.userId("user" + idx).userName("�̸�" + idx)
					.userNick("�г��� " + idx).userPw("1234")
					.isAdmin(false)
					.profile(profile).build();
			profile.setUser(user);
			urepo.save(user);
		});
	}
	
//	@Test
//	void test2ProfileVO() {
//		ProfileVO profile = ProfileVO.builder().build();
//		UserVO user = urepo.findById(10L).orElse(null);
//		profile.setUser(user);
//		prepo.save(profile);
//	}

	
//	@Test
	void test3FollowerVO() {
		FollowVO follow = FollowVO.builder().build();
		
		UserVO user1 = urepo.findById(5L).orElse(null);
		UserVO user2 = urepo.findById(1L).orElse(null);
		
		follow.setFollower(user1);
		follow.setFollowing(user2);
		frepo.save(follow);
	}
	
//	@Test
	void test4TripVO() {
		Date date = new Date(2023, 5, 2);
		TripVO trip = TripVO.builder().tripName("�׳��׽�Ʈ����").tripDest("ȫ��").tripStart(new Timestamp(date.getTime()))
				.tripEnd(new Timestamp(date.getTime())).tripExp(100000L).build();

		UserVO user1 = urepo.findById(7L).orElse(null);
		trip.setUser(user1);
		trepo.save(trip);
		
	}
//	@Test
	void test5SnsVO() {
		IntStream.range(0, 3).forEach(idx -> {
			TripVO trip = trepo.findById(91L).orElse(null);
			SnsVO sns =SnsVO.builder().snsContent("����" + idx).snsPhoto("����.jpg@@����2.jpg@@����3.png").snsScope(0).sns(trip).build(); 
			
			srepo.save(sns);
		});
	}
	
//	@Test
	void test6ReplyVO() {
		SnsVO sns = srepo.findById(64L).orElse(null);
		UserVO user1 = urepo.findById(5L).orElse(null);
		UserVO user2 = urepo.findById(15L).orElse(null);
		
		ReplyVO reply = ReplyVO.builder().user(user1).sns(sns)
				.replyContent("����1").build();
		ReplyVO reply2 = ReplyVO.builder().user(user2).sns(sns)
				.replyContent("����2").build();
		
		rrepo.save(reply);
		rrepo.save(reply2);
	}
	
//	@Test
	void test7HeartVO() {
		SnsVO sns = srepo.findById(64L).orElse(null);
		UserVO user1 = urepo.findById(5L).orElse(null);
		UserVO user2 = urepo.findById(15L).orElse(null);
		
		HeartVO heart = HeartVO.builder().user(user1).sns(sns).build();
		HeartVO heart2 = HeartVO.builder().user(user2).sns(sns).build();
		
		hrepo.save(heart);
		hrepo.save(heart2);
	}
	
//	@Test
	void test8HashtagVO() {
		SnsVO sns = srepo.findById(64L).orElse(null);
		
		HashtagVO tag = HashtagVO.builder().htHashtag("#�� #�� #���� #�����").sns(sns).build();
		String str = tag.getHtHashtag();
		System.out.println(Arrays.toString(str.split(" ")));
		
		tagRepo.save(tag);
	}
	
//	@Test
	void test9CardVO() {
		IntStream.range(1, 4).forEach(idx -> {
			CardVO card = CardVO.builder().cardBank("����")
					.cardName("ī��" + idx).cardPhoto("����" + idx).build();
			CardVO saved = crepo.save(card);
			
			DiscountVO dc = DiscountVO.builder().dcCate("����")
					.dcDiscount(10).card(saved).build();
			DiscountVO dc2 = DiscountVO.builder().dcCate("����")
					.dcCashback(10).card(saved).build();
			
			drepo.save(dc);
			drepo.save(dc2);
		});

	}
	
//	@Test
	void test10ExpVO1() {
		// �Խñ��� ���� �ְ� �������� ���߿� �����ϴ� ���
		// ����, �Խñ� 92���� ����
		SnsVO sns = srepo.findById(92L).orElse(null);
		TripVO trip = trepo.findById(91L).orElse(null);
		ExpVO exp =ExpVO.builder()
				.trip(trip)
				.sns(sns)
				.expPlace("����")
				.expAddress("ȫ��")
				.expMoney(10000L)
				.expTime(new Timestamp(new Date().getTime()))
				.expWay("����")
				.expCate("����").build();
		erepo.save(exp);
	}
	
//	@Test
	void test11ExpVO2() {
		// �Խñ��� ���� �ְ� �������� ���߿� �����ϴ� ���
		// ī��, �Խñ� 93���� ����
		SnsVO sns = srepo.findById(92L).orElse(null);
		TripVO trip = trepo.findById(91L).orElse(null);
		CardVO card = crepo.findById(82L).orElse(null);
		ExpVO exp =ExpVO.builder()
				.trip(trip)
				.sns(sns)
				.expPlace("ī��")
				.expAddress("����")
				.expMoney(10000L)
				.card(card)
				.expTime(new Timestamp(new Date().getTime()))
				.expWay("ī��")
				.expCate("�ĺ�").build();
		erepo.save(exp);
	}
	
//	@Test
	void test12ExpVO() {
		// �������� �ִ� ���
		// ī��
		TripVO trip = trepo.findById(91L).orElse(null);
		CardVO card = crepo.findById(85L).orElse(null);
		ExpVO exp =ExpVO.builder()
				.trip(trip)
				.expPlace("������")
				.expAddress("��������")
				.expMoney(10000L)
				.card(card)
				.expTime(new Timestamp(new Date().getTime()))
				.expWay("ī��")
				.expCate("�ĺ�").build();
		erepo.save(exp);
	}
	
//	@Test
	void test13ExpVO() {
		// test12���� ���� �������� �Խñ� ���
		ExpVO exp = erepo.findById(97L).orElse(null);
		int idx = 10;
		TripVO trip = trepo.findById(91L).orElse(null);
		SnsVO sns =SnsVO.builder()
				.snsContent("����" + idx)
				.snsPhoto("����.jpg@@����2.jpg@@����3.png")
				.snsScope(0)
				.sns(trip)
				.build(); 
		
		SnsVO savedSns = srepo.save(sns);
		exp.setSns(savedSns);
		erepo.save(exp);
	}
	
//	@Test
	void testSelect() {
//		urepo.findById(1L).ifPresent(user -> System.out.println(user));
		urepo.findAll().forEach(user -> System.out.println(user));
	}
}

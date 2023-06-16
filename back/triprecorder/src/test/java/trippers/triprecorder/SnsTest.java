package trippers.triprecorder;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.TripVO;
import trippers.triprecorder.repository.HashtagRepository;
import trippers.triprecorder.repository.SnsRepository;
import trippers.triprecorder.repository.TripRepository;

@SpringBootTest
public class SnsTest {
	@Autowired
	SnsRepository srepo;
	@Autowired
	TripRepository trepo;
	@Autowired
	HashtagRepository hrepo;

//	@Test
	void postRegisterSns() {
		TripVO trip = trepo.findById(2L).orElse(null);
		SnsVO sns = SnsVO.builder().snsContent("내용").snsPhoto("sns/userno/tripno/uuid_사진.jpg@@사진2.jpg@@사진3.png")
				.snsScope(0).sns(trip).build();

		srepo.save(sns);
	}

//	@Test
	void postRegisterSnsWithHashtag() {
		TripVO trip = trepo.findById(2L).orElse(null);
		String hashtag = "";
		System.out.println(hashtag.split("@")[0]);
		List<HashtagVO> tagList = new ArrayList<>();
		
		SnsVO sns = SnsVO.builder().snsContent("해시태그 테스트6").snsPhoto("sns/userno/tripno/uuid_사진.jpg@@사진2.jpg@@사진3.png")
				.snsScope(0).sns(trip).build();
		
		String[] tagArr = hashtag.split("@");
		for(String tag : tagArr) {
			HashtagVO t = HashtagVO.builder().htHashtag(tag).sns(sns).build();
			tagList.add(t);
		}
		
		if(tagList.size() > 1) {
			sns.setHashtag(tagList);
		}
		
		
		srepo.save(sns);
	}
	
	@Test
	void testSplitImage() {
		String image = "짱구";
		for(String img: image.split("@")) {
			System.out.println("이미지: " + img);
		}
	}
}

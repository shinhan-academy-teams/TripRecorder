package trippers.triprecorder.util;

import java.util.ArrayList;
import java.util.List;

import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.dto.ReplyDto;
import trippers.triprecorder.dto.SnsDto;
import trippers.triprecorder.dto.UserSimpleDto;
import trippers.triprecorder.entity.HashtagVO;
import trippers.triprecorder.entity.ReplyVO;
import trippers.triprecorder.entity.SnsVO;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.HashtagRepository;
import trippers.triprecorder.repository.HeartRepository;
import trippers.triprecorder.repository.ReplyRepository;
import trippers.triprecorder.repository.UserRepository;

public class MakeSnsUtil {
	// SnsDto 생성
	public static SnsDto makeSnsDto(SnsVO tmpSns, Long userNo, UserRepository urepo, ReplyRepository rrepo,
			HeartRepository hrepo, HashtagRepository tagrepo) {
		SnsDto sns = SnsDto.builder().tripNo(tmpSns.getSns().getTripNo()).snsNo(tmpSns.getSnsNo())
				.snsTitle(tmpSns.getSnsTitle()).snsContent(tmpSns.getSnsContent())
				.snsPhoto(MakeSnsUtil.getSnsImages(tmpSns.getSnsPhoto())).snsRegdate(tmpSns.getSnsRegdate())
				.snsScope(tmpSns.getSnsScope())
				.snsUser(MakeSnsUtil.getAnyUser(tmpSns.getSns().getUser().getUserNo(), urepo))
				.reply(MakeSnsUtil.getSnsReply(tmpSns, rrepo, urepo))
				.isHeart(MakeSnsUtil.getSnsHeart(tmpSns, userNo, hrepo))
				.heartCnt(hrepo.findBySns(tmpSns).size())
				.hashtag(MakeSnsUtil.getSnsHashtag(tmpSns, tagrepo)).build();

		return sns;
	}

	// 게시글 이미지 주소로 가져오기
	public static List<String> getSnsImages(String snsPhoto) {
		List<String> photo = new ArrayList<>();
		String[] images = snsPhoto.split("@");
		for (int i = 0; i < images.length; i++) {
			photo.add(AwsUtil.getImageURL(images[i]));
		}

		return photo;
	}

	// 작성자 가져오기
	public static UserSimpleDto getAnyUser(Long userNo, UserRepository urepo) {
		UserVO tmpUser = urepo.findById(userNo).orElse(null);

		UserSimpleDto user = UserSimpleDto.builder().userNo(tmpUser.getUserNo()).userNick(tmpUser.getUserNick())
				.userProfile(AwsUtil.getImageURL(tmpUser.getProfile().getProfilePhoto())).build();
		return user;
	}

	// 게시글 댓글 가져오기
	public static List<ReplyDto> getSnsReply(SnsVO sns, ReplyRepository rrepo, UserRepository urepo) {
		List<ReplyVO> tmpReplyList = rrepo.findBySns(sns);

		List<ReplyDto> replyList = new ArrayList<>();
		tmpReplyList.forEach(tmpReply -> {
			ReplyDto reply = ReplyDto.builder().snsNo(sns.getSnsNo()).replyNo(tmpReply.getReplyNo())
					.replyContent(tmpReply.getReplyContent()).replyRegdate(tmpReply.getReplyRegdate())
					.replyUser(getAnyUser(tmpReply.getUser().getUserNo(), urepo)).build();
			replyList.add(reply);
		});

		return replyList;
	}

	// 게시글 좋아요 여부 가져오기
	public static boolean getSnsHeart(SnsVO sns, Long userNo, HeartRepository hrepo) {
		MultiKey key = MultiKey.builder().sns(sns.getSnsNo()).user(userNo).build();
		return hrepo.findById(key).orElse(null) != null;
	}

	// 게시글 해시태그 가져오기
	public static List<String> getSnsHashtag(SnsVO sns, HashtagRepository tagrepo) {
		List<HashtagVO> tagList = tagrepo.findBySns(sns);
		List<String> tag = new ArrayList<>();

		for (int i = 0; i < tagList.size(); i++) {
			HashtagVO tmpTag = tagList.get(i);
			tag.add("#" + tmpTag.getHtHashtag());

		}

		return tag;
	}
}

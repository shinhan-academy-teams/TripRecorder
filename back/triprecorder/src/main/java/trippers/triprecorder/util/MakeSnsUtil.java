package trippers.triprecorder.util;

import java.util.ArrayList;
import java.util.List;

import trippers.triprecorder.dto.MultiKey;
import trippers.triprecorder.dto.ReplyDto;
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
	// 게시글 이미지 주소로 가져오기
	public static String getSnsImages(String snsPhoto) {
		String photo = "";
		String[] images = snsPhoto.split("@");
		for (int i = 0; i < images.length; i++) {
			photo += AwsUtil.getImageURL(images[i]);
			if (i != images.length - 1) {
				photo += "@";
			}
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
	public static String getSnsHashtag(SnsVO sns, HashtagRepository tagrepo) {
		List<HashtagVO> tagList = tagrepo.findBySns(sns);
		String tag = "";

		for (int i = 0; i < tagList.size(); i++) {
			HashtagVO tmpTag = tagList.get(i);
			tag += "#" + tmpTag.getHtHashtag();
			if (i != tagList.size() - 1) {
				tag += "@";
			}
		}

		return tag;
	}
}

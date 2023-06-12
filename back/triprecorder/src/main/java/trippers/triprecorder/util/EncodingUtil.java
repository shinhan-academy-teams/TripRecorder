package trippers.triprecorder.util;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

import org.json.simple.JSONObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class EncodingUtil {
	// 비밀번호 암호화
	public static String encodingUserPw(String userPw) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder.encode(userPw);
	}
	
	// 비밀번호 검증
	public static boolean verifyUserPw(String rawPw, String encodedPw) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder.matches(rawPw, encodedPw);
	}
	
	// 복호화한 문자열
	public static String getDecodedStr(String str) {
		Base64.Decoder decoder = Base64.getUrlDecoder();
		String decodeStr = null;
		try {
			decodeStr = new String(decoder.decode(str), "UTF-8").trim();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return decodeStr;
	}
}

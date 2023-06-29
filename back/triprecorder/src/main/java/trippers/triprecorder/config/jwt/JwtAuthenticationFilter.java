package trippers.triprecorder.config.jwt;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.java.Log;
import trippers.triprecorder.config.auth.PrincipalDetails;
import trippers.triprecorder.dto.UserSimpleDto;
import trippers.triprecorder.dto.LoginRequestDto;
import trippers.triprecorder.repository.ProfileRepository;
import trippers.triprecorder.util.AwsUtil;
import trippers.triprecorder.util.JsonUtil;

@Log
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final AuthenticationManager authenticationManager = getAuthenticationManager();
	private ProfileRepository prepo;

	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, ProfileRepository prepo) {
		super(authenticationManager);
		this.prepo = prepo;
		this.setFilterProcessesUrl("/auth/login");
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		ObjectMapper om = new ObjectMapper();
		LoginRequestDto loginRequestDto = null;

		try {
			loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);

		} catch (IOException e) {
			e.printStackTrace();
		}

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				loginRequestDto.getUserId(), loginRequestDto.getUserPw());

		Authentication authentication = authenticationManager.authenticate(authenticationToken);

		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		log.info("** Filter에서 로그인 성공!! **");
		log.info(principalDetails.getUser().toString());

		return authentication;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

		String jwtToken = JWT.create().withSubject("userinfo")
				.withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
				.withClaim("userNo", principalDetails.getUser().getUserNo())
				.withClaim("userId", principalDetails.getUser().getUserId())
				.withClaim("userNick", principalDetails.getUser().getUserNick())
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));

		UserSimpleDto user = UserSimpleDto.builder().userNo(principalDetails.getUser().getUserNo())
				.userNick(principalDetails.getUser().getUserNick()).userId(principalDetails.getUser().getUserId())
				.build();

		String profile = prepo.findById(user.getUserNo()).orElse(null).getProfilePhoto();
		String profileUrl = AwsUtil.getImageURL(profile);
		user.setUserProfile(profileUrl);

		String jsonString = JsonUtil.getObjectToJsonString(user);

		response.setCharacterEncoding("UTF-8");
		response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
		response.getWriter().write(jsonString);
	}
}
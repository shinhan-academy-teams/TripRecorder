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

import lombok.RequiredArgsConstructor;
import trippers.triprecorder.config.auth.PrincipalDetails;
import trippers.triprecorder.dto.LoginRequestDto;

//spring security에서 UsernamePasswordAuthenticationFilter가 있음
///login 요청해서 username, password 전송하면(post) 필터가 동작함
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	private final AuthenticationManager authenticationManager;
	
	// /login 요청을 하면 로그인 시도를 위해 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JwtAuthenticationFilter: 로그인 시도중 - attemptAuthentication");
		ObjectMapper om = new ObjectMapper();
		LoginRequestDto loginRequestDto = null;
		// 1. username, password를 받아서
		try {
			loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
			System.out.println(loginRequestDto);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("=====================================");
		// 2. 정상인지 로그인 시도를 해본다
		// authenticationManager로 로그인 시도를 하면 -> PrincipalDetailsService가 호출 -> loadByUsername이 실행된다~
		// 3. PrincipalDetails를 세션에 담고 (권한 관리를 위해)
		// 4. JWT 토큰을 만들어 응답하면 성공~
		UsernamePasswordAuthenticationToken authenticationToken = 
				new UsernamePasswordAuthenticationToken(loginRequestDto.getUserId(), loginRequestDto.getUserPw());
		// PrincipleDetailsService의 loadByUsername 함수 실행
		Authentication authentication = authenticationManager.authenticate(authenticationToken);
		// 로그인 되었다!
		System.out.println("** Filter에서 로그인 성공!! 이제 토큰 만들러 가자!! **");
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		System.out.println(principalDetails.getUser());
		
		// return => authentication 객체가 session 영역에 저장됨
		// return의 이유: 권한 관리를 security가 대신 해주기 때문에 편하기 위해
		// 굳이 JWT 토큰을 사용하며 세션을 만들 이유가 없음 -> 단지 권한 처리때문에 session 넣는 것
		return authentication;
	}
	
	// 인증이 정상적으로 되었을 때 실행되는 함수
	// 여기서 JWT 토큰을 만들어 사용자에게 jwt 토큰을 response 해주면 됨~
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("인증 완료~~~~");
		
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
		// Hash 암호방식으로 토큰 생성
		String jwtToken = JWT.create()
			.withSubject("userinfo")
			.withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME)) 
			.withClaim("userno", principalDetails.getUser().getUserNo())
			.withClaim("userid", principalDetails.getUser().getUserId())
			.withClaim("usernick", principalDetails.getUser().getUserNick())
			.sign(Algorithm.HMAC512(JwtProperties.SECRET));
		
		response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
	}
}
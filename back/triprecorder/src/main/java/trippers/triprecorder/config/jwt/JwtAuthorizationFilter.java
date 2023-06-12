package trippers.triprecorder.config.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import trippers.triprecorder.config.auth.PrincipalDetails;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.UserRepository;

//security가 filter 가지고 있는데 필터 중 BasicAuthenticationFilter라는 것이 있음
//권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 탐
//만약 권한, 인증이 필요한 주소가 아니라면 필터를 타지 않음
public class JwtAuthorizationFilter extends BasicAuthenticationFilter{
	private UserRepository userRepository;

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
		super(authenticationManager);
		this.userRepository = userRepository;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("** 인증이나 권한이 필요한 주소 요청 **");
		
		String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);
		System.out.println("jwtHeader: " + jwtHeader);
		
		// header가 있는지 확인
		if(jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
			System.out.println("헤더가 없군!");
			chain.doFilter(request, response);
			return;
		}
		
		String jwtToken = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
		String userid = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("userid").asString();
		// 서명이 정상적으로 됨
		if(userid != null) {
			System.out.println(userid);
			UserVO userEntity = userRepository.findByUserId(userid);
			PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
//			PrincipalDetails principalDetails = new PrincipalDetails(entity);
			// JWT 토큰 서명을 통해 서명이 정상이면 Authentication 객체를 만들어준다.
			Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
			
			// Security를 저장할 수 있는 세션 공간
			// 강제로 security의 세션에 접근하여 authentication 객체를 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
			chain.doFilter(request, response);
		}
	} 
}
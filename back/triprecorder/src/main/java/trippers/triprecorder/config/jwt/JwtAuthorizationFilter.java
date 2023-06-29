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

import lombok.extern.java.Log;
import trippers.triprecorder.config.auth.PrincipalDetails;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.UserRepository;

@Log
public class JwtAuthorizationFilter extends BasicAuthenticationFilter{
	private UserRepository urepo;

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
		super(authenticationManager);
		this.urepo = userRepository;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		log.info("** 인증이나 권한이 필요한 주소 요청 **");
		
		String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);
		log.info("jwtHeader: " + jwtHeader);
		
		if(jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
			chain.doFilter(request, response);
			return;
		}
		
		String jwtToken = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
		String userid = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("userId").asString();

		if(userid != null) {
			UserVO userEntity = urepo.findByUserId(userid);
			PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

			Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			chain.doFilter(request, response);
		}
	} 
}
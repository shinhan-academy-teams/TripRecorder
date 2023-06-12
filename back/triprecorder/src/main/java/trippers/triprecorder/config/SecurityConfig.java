package trippers.triprecorder.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

import lombok.RequiredArgsConstructor;
import trippers.triprecorder.config.jwt.JwtAuthenticationFilter;
import trippers.triprecorder.config.jwt.JwtAuthorizationFilter;
import trippers.triprecorder.repository.UserRepository;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	private final CorsFilter corsFilter;
	private final UserRepository userRepository;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable() // csrf 토큰을 사용하지 않겠다
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않겠다 => stateless server로 만들겠다
			.and()
			.addFilter(corsFilter) // cors 정책 필터 (@CrossOrigin: 인증X, 시큐리티 필터에 등록: 인증O)
			.formLogin().disable() // formLogin을 사용하지 않겠다
			.httpBasic().disable() // httpBasic 방식은 id, pw를 들고 요청하기 때문에 안전하지 않음 (노출 가능성 O) -> 따라서 이를 토큰으로 대체해 사용(Bearer 방식)
			.addFilter(new JwtAuthenticationFilter(authenticationManager())) // AuthenticationManager를 던져줘야 함
			.addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
			.authorizeRequests()
			.antMatchers("/api/v1/user/**")
			.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") // 요청이 /user/이면 해당 권한만 접근 가능
			.antMatchers("/api/vi/admin/**")
			.hasRole("ADMIN") // 요청이 /admin이면 해당 권한만 접근 가능
			.antMatchers("/admin/**").hasRole("ADMIN")
			.antMatchers("/user/**").hasRole("USER")
			.anyRequest().permitAll() // 나머지 요청은 모두에게 허락 
			;
	}
}
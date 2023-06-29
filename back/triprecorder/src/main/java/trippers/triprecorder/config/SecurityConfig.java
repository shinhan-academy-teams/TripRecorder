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
import trippers.triprecorder.repository.ProfileRepository;
import trippers.triprecorder.repository.UserRepository;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	private final CorsFilter corsFilter;
	private final UserRepository urepo;
	private final ProfileRepository prepo;
	
	// security
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable() 
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
			.and()
			.addFilter(corsFilter) 
			.formLogin().disable() 
			.httpBasic().disable()
			.addFilter(new JwtAuthenticationFilter(authenticationManager(), prepo))
			.addFilter(new JwtAuthorizationFilter(authenticationManager(), urepo))
			.authorizeRequests()
			.antMatchers("/auth/**").permitAll()
			.antMatchers("/**/register/**").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
			.antMatchers("/**/update/**").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
			.antMatchers("/**/delete/**").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
			.antMatchers("/**/user/**").access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')") 
			.antMatchers("/**/admin/**").hasRole("ADMIN")
			.anyRequest().permitAll() 
			;
	}
}
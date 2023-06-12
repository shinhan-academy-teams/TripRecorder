package trippers.triprecorder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true); // 내 서바가 응답을 할 때 JSON을 JS에서 처리할 수 있게 할지 설정
		config.addAllowedOrigin("*"); // 모든 ip에 응답을 허용
		config.addAllowedHeader("*"); // 모든 header에 응답을 허용
		config.addAllowedMethod("*"); // 모든 method(get, post...) 요청을 허용
		source.registerCorsConfiguration("/api/**", config); // /api/의 요청은 전부 해당 config를 따라야 함
		return new CorsFilter(source);
	}
}
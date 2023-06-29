package trippers.triprecorder.config.jwt;

public class JwtProperties {
	static final String SECRET = "TripRecorderByTrippers";
	static final int EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 하루
	static final String TOKEN_PREFIX = "Bearer ";
	static final String HEADER_STRING = "Authorization";
}

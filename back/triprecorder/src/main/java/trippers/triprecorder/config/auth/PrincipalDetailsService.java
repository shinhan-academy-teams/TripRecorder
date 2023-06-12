package trippers.triprecorder.config.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import trippers.triprecorder.entity.UserVO;
import trippers.triprecorder.repository.UserRepository;

//http://localhost:9009/login
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService{
	private final  UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		System.out.println("PrincipalDetailsService loadByUsername 실행된다~");
		UserVO userEntity = userRepository.findByUserId(userId); 
		return new PrincipalDetails(userEntity);
	}
	
}
package trippers.triprecorder.config.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import lombok.Data;
import trippers.triprecorder.entity.UserVO;

@Data
public class PrincipalDetails implements UserDetails{

	private UserVO user;
	
	public PrincipalDetails(UserVO user) {
		this.user = user;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		if(user != null)
			authorities.add(new SimpleGrantedAuthority(user.getUserRole().toString()));
		return authorities;
	}
	@Override
	public String getPassword() {
		return user != null ? user.getUserPw() : null;
	}
	@Override
	public String getUsername() {
		return user != null ? user.getUserId() : null;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
}
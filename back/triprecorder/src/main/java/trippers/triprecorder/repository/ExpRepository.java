package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trippers.triprecorder.entity.ExpVO;

@Repository
public interface ExpRepository extends JpaRepository<ExpVO, Long> {
	public ExpVO findByExpNo(Long expNo);
}

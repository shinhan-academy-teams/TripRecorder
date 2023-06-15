package trippers.triprecorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import trippers.triprecorder.entity.ReplyVO;

public interface ReplyRepository extends JpaRepository<ReplyVO, Long>{

}

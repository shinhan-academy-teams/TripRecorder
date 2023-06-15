package trippers.triprecorder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.entity.ExpVO;
import trippers.triprecorder.repository.ExpRepository;

@RestController
@RequestMapping("/exp")
public class ExpController {

    @Autowired
    ExpRepository erepo;


    //경비등록
    @PostMapping("/register")
    public String ocr(@RequestBody ExpVO exp) {
        ExpVO savedExp = erepo.save(exp);
        
        if (savedExp != null) {
            return "등록완료";
        } else {
            return "등록실패";
        }
    }
    
    
    
    //경비수정
    @PutMapping("/updateexp/{expNo}")
    public String updateOcrData(@PathVariable Long expNo, @RequestBody ExpVO exp) {

    	ExpVO existingExp = erepo.findByExpNo(expNo);
        if (existingExp == null) {
            return "ExpVO with ID " + expNo + " not found";
        }

        exp.setExpNo(expNo); 
        ExpVO updatedExp = erepo.save(exp); 
        
        if (updatedExp != null) {
            return "수정완료";
        } else {
            return "수정실패";
        }
    }
    
    //경비삭제
    
}

package trippers.triprecorder.controller;


import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import trippers.triprecorder.dto.ExpDto;

@RestController
@RequestMapping("/img")
public class ImgController {

    @GetMapping("/imgencoding")
    public String processImage(@RequestParam String imageUrl) throws IOException {
    	URL urlInput = new URL(imageUrl);
    	BufferedImage urlImage = ImageIO.read(urlInput);
    				
    	ByteArrayOutputStream bos = new ByteArrayOutputStream();
    	ImageIO.write(urlImage, "jpg", bos );
    	Encoder encoder = Base64.getEncoder(); // java.util.Base64.Encoder
    		        
    	String encodedString = encoder.encodeToString(bos.toByteArray());
    	return encodedString;
    }
    @PostMapping("/imgrequest")
    public List<ExpDto> processReceipt() throws IOException {
        StringBuffer sb = new StringBuffer();
        StringBuilder urlBuilder = new StringBuilder("https://zb14opqp5c.apigw.ntruss.com/custom/v1/23080/56a7ce454d8246990cc3ee3baeeabb7bba95fd331521455e6473fa63038eb26e/document/receipt");
        urlBuilder.append("");
        
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        
        // Request 형식 설정
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        
        // 응답 데이터 받아오기
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 & conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
            
        ObjectMapper mapper = new ObjectMapper();
        
        // 응답 데이터를 object mapper를 이용해 list화 한다.
        //List<ExpDto> response = mapper.readValue(sb.toString(), new TypeReference<List<ExpDto>>() {});
        
        // 저장할 경비의 이름들만 리스트로 저장
		/*
		 * List<String> expDtoNames = Arrays.asList(ExpDtoName.values()) .stream()
		 * .map(expDtoName -> expDtoName.getUnit()) .collect(Collectors.toList());
		 * 
		 * // list화 한 응답 데이터를 저장할 대상만 필터링 List<ExpDto> filteredExpDtoList =
		 * response.stream() .filter(expDto ->
		 * expDtoNames.contains(expDto.getCurUnit())) .collect(Collectors.toList());
		 * 
		 * // 원래 저장되어 있던 데이터 List<ExpDto> savedExpDtoList = expDtoRepository.findAll();
		 * Map<String, ExpDto> expDtoMap = new HashMap<>();
		 * 
		 * // 응답 데이터 Map으로 변환: filteredExpDtoList -> expDtoMap for (ExpDto expDto :
		 * filteredExpDtoList) { expDtoMap.put(expDto.getCurUnit(), expDto); }
		 * 
		 * for (ExpDto savedExpDto : savedExpDtoList) { ExpDto expDto =
		 * expDtoMap.get(savedExpDto.getCurUnit()); if (expDto != null) {
		 * savedExpDto.setExpPlace(expDto.getExpPlace());
		 * savedExpDto.setExpAddress(expDto.getExpAddress());
		 * savedExpDto.setExpMoney(expDto.getExpMoney());
		 * savedExpDto.setCardBank(expDto.getCardBank());
		 * savedExpDto.setExpTime(expDto.getExpTime());
		 * 
		 * } }
		 * 
		 * // 업데이트된 데이터 저장 expDtoRepository.saveAll(savedExpDtoList);
		 */
        
        // 리턴
        return null;
    }

}

package trippers.triprecorder.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/img")
public class ImgController {

    @PostMapping("/imgencoding")
    public String processImage(@RequestBody String imageUrl) {
        // 이미지 URL을 통해 이미지 데이터 가져오기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> imageResponse = restTemplate.exchange(
                imageUrl,
                HttpMethod.GET,
                null,
                byte[].class
        );
        byte[] imageBytes = imageResponse.getBody();

        // 이미지 데이터를 Base64로 인코딩
        String encodedImage = Base64Utils.encodeToString(imageBytes);

        // API에 전송할 JSON 데이터 구성
        String jsonInputString = "{\"version\":\"V2\",\"requestId\":\"string\",\"timestamp\":0,\"images\":[{\"format\":\"jpg\",\"name\":\"test 1\",\"data\":\"" + encodedImage + "\"}]}";

        // POST 요청 보내기
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonInputString, headers);
        RestTemplate restTemplate2 = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate2.exchange(
                "https://zb14opqp5c.apigw.ntruss.com/custom/v1/23080/56a7ce454d8246990cc3ee3baeeabb7bba95fd331521455e6473fa63038eb26e/document/receipt",
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        String responseBody = responseEntity.getBody();

        return responseBody;
    }
}


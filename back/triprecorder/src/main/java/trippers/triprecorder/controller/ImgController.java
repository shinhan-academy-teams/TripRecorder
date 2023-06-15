package trippers.triprecorder.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.List;

import javax.imageio.ImageIO;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import trippers.triprecorder.dto.ExpDto;
import trippers.triprecorder.util.JsonUtil;

@RestController
@RequestMapping("/img")
public class ImgController {

	@PostMapping("/imgencoding")
	public String processImage(@RequestBody JSONObject imageObj) throws IOException {
		System.out.println(imageObj); 
		System.out.println(imageObj.get("imageUrl"));
		URL urlInput = new URL(imageObj.get("imageUrl").toString());
		BufferedImage urlImage = ImageIO.read(urlInput);

		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(urlImage, "jpg", bos);
		Encoder encoder = Base64.getEncoder(); // java.util.Base64.Encoder

		String encodedString = encoder.encodeToString(bos.toByteArray());
		return encodedString;
		
	}

	@PostMapping("/imgrequest")
	public JSONObject processReceipt(@RequestBody JSONObject imageObj) throws IOException {
		URL urlInput = new URL(imageObj.get("imageUrl").toString());
		BufferedImage urlImage = ImageIO.read(urlInput);

		//프론트에서 이미지를 줄 때 파일명까지 받아서 끝에 .split으로 마지막 인덱스를 집어넣기(확장자를 얻기위해)
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(urlImage, "jpg", bos);
		Encoder encoder = Base64.getEncoder(); // java.util.Base64.Encoder

		String encodedString = encoder.encodeToString(bos.toByteArray());
		
	    StringBuffer sb = new StringBuffer();
	    StringBuilder urlBuilder = new StringBuilder("https://zb14opqp5c.apigw.ntruss.com/custom/v1/23080/56a7ce454d8246990cc3ee3baeeabb7bba95fd331521455e6473fa63038eb26e/document/receipt");

	    URL url = new URL(urlBuilder.toString());
	    HttpURLConnection conn = (HttpURLConnection) url.openConnection();

	    // Request 형식 설정
	    conn.setRequestMethod("POST");
	    conn.setRequestProperty("Content-Type", "application/json");
	    conn.setRequestProperty("X-OCR-SECRET", " ");
	    conn.setDoOutput(true);
	    
	    ArrayList<JSONObject> imgObjArray = new ArrayList<>();
	    JSONObject imgObj = new JSONObject();
	    imgObj.put("format", "jpg"); // 가변으로 받아서 수정해야 한다
	    imgObj.put("name", "영수증1");
	    imgObj.put("data", encodedString);
	    imgObjArray.add(imgObj);
	    
	    JSONObject obj = new JSONObject();
	    
	    obj.put("version", "V2");
	    obj.put("requestId", "string");
	    obj.put("timestamp", 0);
	    obj.put("images", imgObjArray);

	    String jsonString = JsonUtil.getObjectToJsonString(obj);
	    
	    OutputStream os = conn.getOutputStream();
	    byte[] input = jsonString.getBytes("utf-8");
	    os.write(input, 0, input.length);
	    
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
	    os.close();
	    rd.close();
	    conn.disconnect();
	    
	    System.out.println(sb);
	    
	    JSONObject resultObj = JsonUtil.getStringToJsonObj(sb.toString());

	    return resultObj;
    }
}


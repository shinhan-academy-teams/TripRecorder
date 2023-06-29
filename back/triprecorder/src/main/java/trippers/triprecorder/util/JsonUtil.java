package trippers.triprecorder.util;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {
	// JSON 문자열을 JSONObject로 반환
	public static JSONObject getStringToJsonObj(String str) {
		JSONParser parser = new JSONParser();
		JSONObject jsonObj = null;
		try {
			jsonObj = (JSONObject) parser.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return jsonObj;
	}

	// Java Object를 JSON 문자열로 반환
	public static String getObjectToJsonString(Object obj) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(obj);
	}
}

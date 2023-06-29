package trippers.triprecorder;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import trippers.triprecorder.util.AwsUtil;

@SpringBootTest
public class AwsTest {

//	@Test
	void getImageUrlByUtil() {
        String keyName = "profile/default_profile.png";
        
        String url = AwsUtil.getImageURL(keyName);
        System.out.println(url);
	}
	
	@Test
	void deleteImage() {
		String[] objectName = {"upload/짱구.jpg"};
		AwsUtil.deleteBucketObjects(objectName);
	}
}

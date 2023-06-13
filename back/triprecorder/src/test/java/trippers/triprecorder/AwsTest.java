package trippers.triprecorder;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import trippers.triprecorder.aws.GetObjectUrl;

@SpringBootTest
public class AwsTest {
	@Test
	void getImageUrl() {
		String bucketName = "trip-recorder";
        String keyName = "profile/default_profile.png";
        ProfileCredentialsProvider credentialsProvider = ProfileCredentialsProvider.create();
        Region region = Region.US_EAST_1;
        S3Client s3 = S3Client.builder()
            .region(region)
            .credentialsProvider(credentialsProvider)
            .build();

        String url = GetObjectUrl.getURL(s3,bucketName,keyName);
        System.out.println(url);
	}
}

package trippers.triprecorder.util;

import java.net.URL;
import java.util.ArrayList;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;

public class AwsUtil {
	private final S3Client s3;
	private static final String BUCKET_NAME = "trip-recorder";

	public AwsUtil() {
		ProfileCredentialsProvider credentialsProvider = ProfileCredentialsProvider.create();
		Region region = Region.AP_NORTHEAST_2;
		this.s3 = S3Client.builder().region(region).credentialsProvider(credentialsProvider).build();
	}

	public static String getImageURL(String keyName) {
		AwsUtil awsUtil = new AwsUtil();
		GetUrlRequest request = GetUrlRequest.builder().bucket(BUCKET_NAME).key(keyName).build();
		URL url = awsUtil.s3.utilities().getUrl(request);
		awsUtil.s3.close();

		return url.toString();
	}

	public static void deleteBucketObjects(String[] keyName) {
		AwsUtil awsUtil = new AwsUtil();
		ArrayList<ObjectIdentifier> toDelete = new ArrayList<>();
		for(String key : keyName) {
			toDelete.add(ObjectIdentifier.builder().key(key).build());
		}
		
		DeleteObjectsRequest dor = DeleteObjectsRequest.builder().bucket(BUCKET_NAME)
				.delete(Delete.builder().objects(toDelete).build()).build();
		
		awsUtil.s3.deleteObjects(dor);
		
		awsUtil.s3.close();
	}
}

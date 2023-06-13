package trippers.triprecorder.aws;

import java.net.URL;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;

public class GetObjectUrl {
	public static String getURL(S3Client s3, String bucketName, String keyName ) {
        GetUrlRequest request = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .build();
        URL url = s3.utilities().getUrl(request);
        System.out.println("The URL for  "+keyName +" is "+ url);
        return url.toString();
    }
}

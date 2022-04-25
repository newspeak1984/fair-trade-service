import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomBytes } from 'crypto';

@Injectable()
export class AwsService {
  async generateUploadURL(): Promise<string> {
    const s3 = new S3();
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageName,
      Expires: 60,
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }
}

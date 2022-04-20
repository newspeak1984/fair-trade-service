import { Args, Query, Resolver } from '@nestjs/graphql';
import { AwsService } from './aws.service';

@Resolver()
export class AwsResolver {
  constructor(private awsService: AwsService) {}

  @Query(() => String, { name: 'getS3PresignedUrl' })
  getS3PresignedUrl() {
    return this.awsService.generateUploadURL();
  }
}

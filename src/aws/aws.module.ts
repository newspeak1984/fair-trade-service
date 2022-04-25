import { Module } from '@nestjs/common';
import { AwsResolver } from './aws.resolver';
import { AwsService } from './aws.service';

@Module({
  providers: [AwsResolver, AwsService],
})
export class AwsModule {}

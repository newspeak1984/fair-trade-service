import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Chat {
  @Field()
  chat_uuid: string;

  @Field()
  sender_uuid: string;

  @Field()
  message: string;

  @Field({ nullable: true })
  trade_uuid?: string;

  @Field(() => Date)
  timestamp: Date;
}

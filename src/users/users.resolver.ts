import { Query, Resolver } from '@nestjs/graphql';
@Resolver()
export class UsersResolver {
  @Query(() => String)
  sayHello() {
    return 'Hello';
  }
}

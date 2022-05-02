import { Args, Query, Resolver } from '@nestjs/graphql';
import { Options } from './models/options.model';
import { OptionsService } from './options.service';

@Resolver()
export class OptionsResolver {
  constructor(private optionsService: OptionsService) {}

  @Query(() => Options)
  getOptions(@Args('name') name: string) {
    return this.optionsService.findOne(name);
  }
}

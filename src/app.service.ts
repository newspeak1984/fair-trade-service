import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'Fair Trade Service is running smoothly!';
  }
}

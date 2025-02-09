import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  log(message: string) {
    return console.log('common service log', message);
  }
}

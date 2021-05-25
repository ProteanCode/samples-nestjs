import { Injectable } from '@nestjs/common';
import MessagingServiceInterface, {
  MessagingServiceSendResponse,
} from '../../interfaces/messaging-service.interface';
import { MessagingService } from '../messaging.service';

@Injectable()
export class NoopService
  extends MessagingService
  implements MessagingServiceInterface {
  public static async healthcheck(): Promise<boolean> {
    return true;
  }

  healthcheck(): Promise<boolean> {
    return Promise.resolve(false);
  }

  send(message: string, topic: string): Promise<MessagingServiceSendResponse> {
    return Promise.resolve({
      id: '0',
    });
  }
}

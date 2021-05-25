import MessagingServiceInterface, {
  MessagingServiceSendResponse,
} from '../interfaces/messaging-service.interface';
import UnimplementedMethodException from '../../../exceptions/UnimplementedMethodException';

export abstract class MessagingService implements MessagingServiceInterface {
  healthcheck(): Promise<boolean> {
    return Promise.resolve(false);
  }

  send(message: string, topic: string): Promise<MessagingServiceSendResponse> {
    throw new UnimplementedMethodException('Please implement send method');
  }
}

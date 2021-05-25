import UnimplementedMethodException from '../../../exceptions/UnimplementedMethodException';
import LoggingServiceInterface from '../interfaces/logging-service.interface';

export abstract class LoggingService implements LoggingServiceInterface {
  info(object: any) {
    throw new UnimplementedMethodException(
      'The info method has not been implemented',
    );
  }
}

import { Injectable } from '@nestjs/common';
import * as https from 'https';
import HealthcheckInterface from './interfaces/healthcheck.interface';
import * as admin from 'firebase-admin';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import App = app.App;
import { ConfigService } from '../config/config.service';
import { messaging } from 'firebase-admin/lib/messaging';
import MessagingTopicResponse = messaging.MessagingTopicResponse;
import ConfigInterface from '../config/interfaces/config.interface';
import MessagingServiceInterface, {
  MessagingServiceSendResponse,
} from '../../interfaces/messaging-service.interface';
import { MessagingService } from '../messaging.service';

@Injectable()
export class FirebaseService
  extends MessagingService
  implements MessagingServiceInterface {
  private readonly app: App;
  constructor(private readonly config: ConfigService) {
    super();
    this.app = admin.initializeApp({
      credential: admin.credential.cert(
        (config as ConfigInterface).serviceAccount,
      ),
      storageBucket: (config as ConfigInterface).storageBucket,
    });
  }

  send(message: string, topic: string): Promise<MessagingServiceSendResponse> {
    return new Promise(async (resolve, reject) => {
      const response: MessagingTopicResponse = await this.app
        .messaging()
        .sendToTopic(topic, {
          data: {
            message: message,
          },
          notification: {
            body: message,
          },
        });
      return resolve({
        id: response.messageId.toString(),
      });
    });
  }

  static healthcheck = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      https.get(
        'https://status.firebase.google.com/incidents.json',
        (response) => {
          let body = '';
          response.on('data', function (chunk) {
            body += chunk;
          });
          response.on('end', function () {
            const data: HealthcheckInterface[] = JSON.parse(body);
            const firebase = data.find(
              (hc) => hc.service_name === 'Cloud Messaging',
            );
            if (firebase) {
              resolve(firebase.most_recent_update.status === 'AVAILABLE');
            }
            resolve(true);
          });
        },
      );
    });
  };
}

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

@Injectable()
export class FirebaseService {
  private readonly app: App;
  constructor(private readonly config: ConfigService) {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(
        (config as ConfigInterface).serviceAccount,
      ),
      storageBucket: (config as ConfigInterface).storageBucket
    });
  }

  send(message: string, topic: string): Promise<MessagingTopicResponse> {
    return this.app.messaging().sendToTopic(topic, {
      data: {
        message: message,
      },
      notification: {
        body: message,
      },
    });
  }

  public static async healthcheck(): Promise<boolean> {
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
  }
}

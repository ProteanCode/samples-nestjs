import { Injectable } from '@nestjs/common';
import * as https from 'https';
import HealthcheckInterface from './interfaces/healthcheck.interface';
import SendMessageDto from '../../dto/send-message.dto';
import * as admin from 'firebase-admin';
import { app, AppOptions } from 'firebase-admin/lib/firebase-namespace-api';
import App = app.App;

@Injectable()
export class FirebaseService implements SendMessageDto {
  private readonly app: App;
  constructor() {
    this.app = admin.initializeApp();
  }

  public send(message: string, topic: string) {
    return '';
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

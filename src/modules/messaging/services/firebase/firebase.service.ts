import { Injectable } from '@nestjs/common';
import * as https from 'https';
import HealthcheckInterface from './interfaces/healthcheck.interface';

@Injectable()
export class FirebaseService {
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

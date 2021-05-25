import { Injectable } from '@nestjs/common';
import Twitter from 'twitter-lite';
import UserInterface from './interfaces/user.interface';
import ResponseInterface from './interfaces/response.interface';
import TweetInterface from './interfaces/tweet.interface';
import GetUserTweetsByIdOptionsInterface from './interfaces/get-user-tweets-by-id-options.interface';
import { ConfigService } from './config/config.service';
import ConfigInterface from './config/interfaces/config.interface';

@Injectable()
export class TwitterService {
  private api: Twitter;
  private access_token: null | string = null;
  private config: ConfigInterface;

  constructor(private readonly configService: ConfigService) {
    this.config = configService as ConfigInterface;
    this.api = new Twitter({
      version: '2', // version "1.1" is the default (change for v2)
      extension: false, // true is the default (this must be set to false for v2 endpoints)
      consumer_key: this.config.consumer.key,
      consumer_secret: this.config.consumer.secret,
    });
  }

  public async getUserIdByName(
    username: string,
  ): Promise<ResponseInterface<UserInterface>> {
    return this.get<UserInterface>('users/by/username/' + username);
  }

  public async getUserTweetsById(
    id: string,
    params?: GetUserTweetsByIdOptionsInterface,
  ): Promise<ResponseInterface<TweetInterface[]>> {
    return this.get<TweetInterface[], GetUserTweetsByIdOptionsInterface>(
      'users/' + id + '/tweets',
      params,
    );
  }

  private async get<T, P = any>(
    url: string,
    params?: P,
  ): Promise<ResponseInterface<T>> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let result = new Promise<ResponseInterface<T>>(() => {}); // type cheat

    try {
      await this.checkForBearer();
      let query = '';
      if (params) {
        const keys = Object.keys(params);
        keys.forEach(
          (key) =>
            (query += key + '=' + params[key as keyof Record<string, unknown>]),
        );
      }

      result = this.api.get<ResponseInterface<T>>(url + '?' + query);
    } catch (e) {
      if ('errors' in e) {
        // Twitter API error
        if (e.errors[0].code === 88)
          // rate limit exceeded
          console.log(
            'Rate limit will reset on',
            new Date(e._headers.get('x-rate-limit-reset') * 1000),
          );
        else {
          console.warn(e);
        }
      }
    }

    return result;
  }

  private async checkForBearer() {
    if (this.access_token === null) {
      const response = await this.api.getBearerToken();

      if (
        response.token_type === 'bearer' &&
        response.access_token.length > 0
      ) {
        this.access_token = response.access_token;
        this.api = new Twitter({
          version: '2', // version "1.1" is the default (change for v2)
          extension: false, // true is the default (this must be set to false for v2 endpoints)
          consumer_key: this.config.consumer.key,
          consumer_secret: this.config.consumer.secret,
          bearer_token: this.access_token,
        });
      } else {
        console.warn('Could not obtain the bearer token from API');
      }
    }
  }
}

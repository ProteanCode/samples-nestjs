import { Injectable } from '@nestjs/common';
import { ManagerConfigService } from './config/config.service';
import ConfigInterface from './config/interfaces/config.interface';
import { TwitterService } from '../../scrapping/services/twitter/twitter.service';

import ScrappingConfigInterface from '../../scrapping/config/interfaces/config.interface';
import { ScrappingConfigService } from '../../scrapping/config/config.service';
import TweetInterface from '../../scrapping/services/twitter/interfaces/tweet.interface';

@Injectable()
export class ManagerService {
  private readonly config: ConfigInterface;
  private readonly twitter: TwitterService;
  private readonly scrappingConfig: ScrappingConfigInterface;

  constructor(
    private readonly configService: ManagerConfigService,
    private readonly scrappingConfigService: ScrappingConfigService,
    twitter: TwitterService,
  ) {
    this.config = configService as ConfigInterface;
    this.scrappingConfig = scrappingConfigService as ScrappingConfigInterface;
    this.twitter = twitter;
  }

  async runAll() {
    if (this.config.use.twitter) {
      await this.runTwitter();
    }
  }

  private async runTwitter() {
    console.log('running twitter');
    const usernames = this.getTwitterUsernames();
    // TODO it could be a more clean code
    for (const username of usernames) {
      const response = await this.twitter.getUserIdByName(username); // TODO cache that request
      if (response.data) {
        const tweets = await this.twitter.getUserTweetsById(response.data.id); // TODO specify tweets after timestamp
        if (tweets.data && tweets.data.length > 0) {
          const patterns = this.getTwitterProfilePatterns(username);
          if (patterns.length > 0) {
            patterns.forEach((pattern) => {
              if (
                tweets.data[0].text.search(new RegExp(pattern, 'ig')) !== -1 // TODO could be mixed into one expression
              ) {
                this.sendTwitterData(tweets.data[0]);
              }
            });
          }
        }
      }
    }
  }

  private sendTwitterData(tweet: TweetInterface) {
    console.log('sending...');
  }

  private getTwitterUsernames() {
    return Object.keys(this.scrappingConfig.twitter.profiles);
  }

  private getTwitterProfilePatterns(username: string): string[] {
    return this.scrappingConfig.twitter.profiles[username].patterns;
  }
}

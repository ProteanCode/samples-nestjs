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
    for (const username of usernames) {
      const response = await this.twitter.getUserIdByName(username);
      if (response.data) {
        const tweets = await this.twitter.getUserTweetsById(response.data.id);
        if (tweets.data) {
          this.sendTwitterData(tweets.data[0]);
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
}

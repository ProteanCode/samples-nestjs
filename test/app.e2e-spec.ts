import { Test } from '@nestjs/testing';
import messagingProviders from '../src/modules/messaging/messaging.providers';
import { MessagingService } from '../src/modules/messaging/services/messaging.service';
import { NoopService } from '../src/modules/messaging/services/noop/noop.service';
import { TwitterService } from '../src/modules/scrapping/services/twitter/twitter.service';
import scrappingProviders from '../src/modules/scrapping/scrapping.providers';

describe('NoopMessagingService', () => {
  let noopMessagingService: NoopService;

  beforeEach(async () => {
    const noopModuleRef = await Test.createTestingModule({
      providers: [...messagingProviders],
    })
      .overrideProvider(MessagingService)
      .useFactory({
        factory: () => new NoopService(),
      })
      .compile();

    noopMessagingService = noopModuleRef.get<MessagingService>(
      MessagingService,
    );
  });

  it('should return a 0 id in case of noop service', async () => {
    const response = await noopMessagingService.send('aaa', 'test');
    expect(response).toHaveProperty('id');
    expect(response.id).toBe('0');
  });
});

describe('WorkingMessagingService', () => {
  let workingMessagingService: MessagingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [...messagingProviders],
    }).compile();

    workingMessagingService = moduleRef.get<MessagingService>(MessagingService);
  });

  describe('send', () => {
    it('should return a messaging service send response', async () => {
      const response = await workingMessagingService.send('aaa', 'test');
      expect(response).toHaveProperty('id');
      expect(response.id).not.toBe('0');
    });
  });
});

describe('TwitterService', () => {
  let twitterService: TwitterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [...scrappingProviders],
    }).compile();

    twitterService = moduleRef.get<TwitterService>(TwitterService);
  });

  describe('getUserIdByName', () => {
    it('should return user id by its username', async () => {
      const response = await twitterService.getUserIdByName('elonmusk');
      expect(response).toHaveProperty('data.id');
      expect(response).toHaveProperty('data.name');
      expect(response.data.username).toBe('elonmusk');
    });
  });

  describe('getUserTweetsById', () => {
    it('should return user tweets by its id', async () => {
      const response = await twitterService.getUserTweetsById('44196397');
      expect(response).toHaveProperty('data');
      expect(response.data[0]).toHaveProperty('text');
    });
  });
});

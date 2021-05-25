import { Test } from '@nestjs/testing';
import messagingProviders from '../src/modules/messaging/messaging.providers';
import { MessagingService } from '../src/modules/messaging/services/messaging.service';
import { NoopService } from '../src/modules/messaging/services/noop/noop.service';

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

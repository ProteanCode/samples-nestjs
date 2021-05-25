export type MessagingServiceSendResponse = {
  id: string;
};

export default interface MessagingServiceInterface {
  send(message: string, topic: string): Promise<MessagingServiceSendResponse>;
}

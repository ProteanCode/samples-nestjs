export default interface SendMessageDto {
  send: (message: string, topic: string) => void;
}

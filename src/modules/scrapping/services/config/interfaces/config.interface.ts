export default interface ConfigInterface {
  consumer: {
    key: string;
    secret: string;
  };
  app: {
    bearer: string;
  };
}

export type AppMode = 'master' | 'slave';

export default interface AppConfigInterface {
  mode: AppMode;
  modes: {
    master: {
      domain: string;
      port: number;
    };
    slave: {
      master_domain: string;
      master_port: number;
    };
  };
}

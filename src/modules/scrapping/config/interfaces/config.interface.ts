export default interface ScrappingConfigInterface {
  twitter: {
    profiles: {
      [key: string]: {
        patterns: string[];
      };
    }
  };
}

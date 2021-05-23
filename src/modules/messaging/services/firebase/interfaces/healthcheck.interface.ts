interface Update {
  created: Date;
  modified: Date;
  when: Date;
  text: string;
  status: string;
}

interface MostRecentUpdate {
  created: Date;
  modified: Date;
  when: Date;
  text: string;
  status: string;
}

interface AffectedProduct {
  title: string;
  id: string;
}

export default interface HealthcheckInterface {
  id: string;
  number: string;
  begin: Date;
  created: Date;
  end: Date;
  modified: Date;
  external_desc: string;
  updates: Update[];
  most_recent_update: MostRecentUpdate;
  status_impact: string;
  severity: string;
  service_key: string;
  service_name: string;
  affected_products: AffectedProduct[];
  uri: string;
}

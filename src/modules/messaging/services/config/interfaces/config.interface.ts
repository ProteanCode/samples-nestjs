import { ServiceAccount } from 'firebase-admin/lib/credential';

export default interface ConfigInterface {
  serviceAccount: ServiceAccount;
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

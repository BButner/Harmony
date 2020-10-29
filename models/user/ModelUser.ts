import { ModelUserSetting } from './ModelUserSetting'

export interface ModelUser {
  avatarUrl: string;
  displayName: string;
  username: string;
  email: string;
  registrationDate: Date;
}

export interface ModelUserSelf {
  id: string;
  avatarUrl: string;
  displayName: string;
  username: string;
  email: string;
  registrationDate: Date;
  userSetup: boolean;
  settings: ModelUserSetting;
  // connectedServices: ModelUserConnectedServices;
}

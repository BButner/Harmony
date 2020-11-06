import { ModelUserSetting } from './ModelUserSetting'

export interface ModelUser {
  idExternal: string;
  avatarUrl: string;
  displayName: string;
  username: string;
  email: string;
  registrationDate: Date;
}

export interface ModelUserSelf {
  id: string;
  idExternal: string,
  avatarUrl: string;
  displayName: string;
  username: string;
  email: string;
  registrationDate: Date;
  userSetup: boolean;
  settings: ModelUserSetting;
  // connectedServices: ModelUserConnectedServices;
}

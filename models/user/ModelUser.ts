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
  uuid: string;
  avatarUrl: string;
  displayName: string;
  username: string;
  email: string;
  registrationDate: Date;
  // settings: ModelUserSetting;
  // connectedServices: ModelUserConnectedServices;
}

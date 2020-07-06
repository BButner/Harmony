import { ModelUserSettingsRaw, ModelUserConnectedServices } from './ModelUserSettings'

export interface ModelUser {
  id: string;
  avatarUrl: string;
  displayName: string;
  userName: string;
  email: string;
  date: Date;
}

export interface ModelUserSelf {
  id: string;
  avatarUrl: string;
  displayName: string;
  userName: string;
  email: string;
  date: Date;
  userSetup: boolean;
  settings: ModelUserSettingsRaw;
  connectedServices: ModelUserConnectedServices;
}

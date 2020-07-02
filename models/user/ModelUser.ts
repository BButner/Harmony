import { UserSettingsRaw } from './ModelUserSettings'

export interface User {
  id: string;
  avatarUrl: string;
  displayName: string;
  userName: string;
  email: string;
  date: Date;
}

export interface UserSelf {
  id: string;
  avatarUrl: string;
  displayName: string;
  userName: string;
  email: string;
  date: Date;
  userSetup: boolean;
  settings: UserSettingsRaw;
}

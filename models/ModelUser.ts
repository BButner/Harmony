import { ModelUserSetting } from './ModelUserSetting'

export interface ModelUser {
  userName: string;
  displayName: string;
  avatarUrl: string;
  registrationDate: Date;
  email: string;
}

export interface ModelUserSelf {
  id: string;
  avatarUrl: string;
  displayName: string;
  userName: string;
  email: string;
  registrationDate: Date;
  userSetup: boolean;
  settings: ModelUserSetting;
}

export const emptyModelUser: ModelUser = {
  avatarUrl: '',
  displayName: '',
  userName: '',
  email: '',
  registrationDate: new Date()
}

interface ModelUserSettingInfo {
  settingField: string;
  settingName: string;
  description: string;
  category: string;
}

export interface ModelUserSetting {
  emailPublic: boolean;
  displayNamePublic: boolean;
  darkMode: boolean;
  settingInfo: ModelUserSettingInfo[];
  [key: string]: boolean | ModelUserSettingInfo[]
}

export interface ModelUserSettingUpdate {
  settings: { field: string, value: any }[]
}

export const emptyModelUserSetting: ModelUserSetting = {
  emailPublic: false,
  displayNamePublic: false,
  darkMode: false,
  settingInfo: [{
    settingField: '',
    settingName: '',
    description: '',
    category: ''
  }]
}

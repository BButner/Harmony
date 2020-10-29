interface ModelUserSettingInfo {
  settingField: string;
  settingName: string;
  description: string;
  category: string;
}

export interface ModelUserSetting {
  emailPublic: boolean;
  displayNamePublic: boolean;
  showImageStats: boolean;
  darkMode: boolean;
  settingInfo: ModelUserSettingInfo[];
}

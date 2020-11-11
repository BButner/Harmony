export interface ModelUserSettingCategory {
  id: number;
  description: string;
  settingCategory: string;
  settingName: string;
}

export interface ModelUserSetting {
  emailPublic: boolean;
  displayNamePublic: boolean;
  darkMode: boolean;
}

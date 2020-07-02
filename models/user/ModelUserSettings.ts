export interface UserSettings {
  settingKey: string;
  settingValue: boolean;
  settingTitle: string;
  settingDescription: string;
}

export interface UserSettingsRaw {
  emailPublic: boolean;
  displayNamePublic: boolean;
  showImageStats: boolean;
}

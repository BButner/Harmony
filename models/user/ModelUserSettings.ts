export interface ModelUserSettings {
  settingKey: string;
  settingValue: boolean;
  settingTitle: string;
  settingDescription: string;
}

export interface ModelUserSettingsRaw {
  emailPublic: boolean;
  displayNamePublic: boolean;
  showImageStats: boolean;
}

export interface ModelUserConnectedServices {
  spotifyConnected: boolean;
  appleMusicConnected: boolean;
  pandoraConnected: boolean;
  youtubeMusicConnected: boolean;
}

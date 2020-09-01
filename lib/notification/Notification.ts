export enum NotificationType {
  SUCCESS,
  WARNING,
  FAILURE,
  DARK_MODE_ENABLED,
  DARK_MODE_DISABLED
}

export interface ToastPropsData {
  content: string;
  iconData: string[];
  key: string;
  type: NotificationType;
}

export const generateNotification = (content: string, type: NotificationType): ToastPropsData => {
  return { content, iconData: getIconDataFromType(type), key: Math.floor(Math.random() * 999999999999).toString(), type }
}

const getIconDataFromType = (type: NotificationType): string[] => {
  switch (type) {
    case NotificationType.SUCCESS:
      return ['fas', 'check']
    case NotificationType.WARNING:
      return ['fas', 'exclamation']
    case NotificationType.FAILURE:
      return ['far', 'times-circle']
    case NotificationType.DARK_MODE_ENABLED:
      return ['fas', 'moon']
    case NotificationType.DARK_MODE_DISABLED:
      return ['fas', 'sun']
    default:
      return ['', '']
  }
}

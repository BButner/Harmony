export enum NotificationType {
  SUCCESS,
  WARNING,
  FAILURE
}

export interface ToastPropsData {
  content: string;
  iconData: string[];
  key: string;
  type: NotificationType;
}

// Have the v-for be for each notification, but actually just have the notification array be an object of the below props data

export const generateNotification = (content: string, type: NotificationType): ToastPropsData => {
  // const T = Vue.extend(Toast)

  // return new T({
  //   propsData: {
  //     content: 'Success!',
  //     iconData: getIconDataFromType(NotificationType.Success)
  //   }
  // })
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
    default:
      return ['', '']
  }
}

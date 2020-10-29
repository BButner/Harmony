interface ServiceLink {
  title: string;
  id: string;
}

interface LoginLink extends ServiceLink {}

export const getServiceLinks = (): ServiceLink[] => {
  return [{
    title: 'Spotify',
    id: 'spotify'
  },
  {
    title: 'Apple Music',
    id: 'apple'
  },
  {
    title: 'Pandora',
    id: 'pandora'
  },
  {
    title: 'YouTube Music',
    id: 'youtube'
  }]
}

export const getLoginLinks = (): LoginLink[] => {
  return [{
    title: 'Google',
    id: 'google'
  },
  {
    title: 'Spotify',
    id: 'spotify'
  },
  {
    title: 'Facebook',
    id: 'facebook'
  },
  {
    title: 'Twitter',
    id: 'twitter'
  }]
}

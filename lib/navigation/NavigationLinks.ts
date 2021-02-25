import { mdiSpotify, mdiApple, mdiYoutube, mdiPandora } from '@mdi/js'

export interface NavigationDetail {
  id: string;
  title: string;
  href: string;
  icon: string;
}

interface LoginLink {
  title: string;
  id: string;
}

export const getNavigationLinks = (): NavigationDetail[] => {
  return [
    { id: 'apple', title: 'Apple Music', href: '/apple', icon: mdiApple },
    { id: 'pandora', title: 'Pandora', href: '/pandora', icon: mdiPandora },
    { id: 'spotify', title: 'Spotify', href: '/spotify', icon: mdiSpotify },
    { id: 'youtube', title: 'YouTube Music', href: '/youtube', icon: mdiYoutube }
  ]
}

export const getLoginLinks = (): LoginLink[] => {
  return [
    { title: 'Google', id: 'google' },
    { title: 'Spotify', id: 'spotify' },
    { title: 'Facebook', id: 'facebook' },
    { title: 'Twitter', id: 'twitter' }
  ]
}
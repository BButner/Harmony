import { iconApple, iconPandora, iconSpotify, iconYoutube } from "lib/icons"

export interface NavigationDetail {
  id: string;
  title: string;
  href: string;
  iconPath: string;
}
interface LoginLink {
  title: string;
  id: string;
}

export const getNavigationLinks = (): NavigationDetail[] => {
  return [
    { id: 'apple', title: 'Apple Music', href: '/apple', iconPath: iconApple },
    { id: 'pandora', title: 'Pandora', href: '/pandora', iconPath: iconPandora },
    { id: 'spotify', title: 'Spotify', href: '/spotify', iconPath: iconSpotify },
    { id: 'youtube', title: 'YouTube Music', href: '/youtube', iconPath: iconYoutube }
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
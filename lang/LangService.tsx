export const getServiceNameFromId = (id: string): string => {
  switch (id) {
    case 'applemusic': return 'Apple Music'
    case 'spotify': return 'Spotify'
    case 'pandora': return 'Pandora'
    case 'youtubemusic': return 'YouTube Music'
    default: return 'N/A'
  }
}

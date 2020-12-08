
import { ModelUnifiedSong } from 'models/service/ModelServiceSong'

export async function fetchPlaylistsSongs (playlistId: string): Promise<ModelUnifiedSong[]> {
  const response = await fetch(`${process.env.API_URL}/service/spotify/playlists/${playlistId}/songs`, {
    credentials: 'include'
  })

  if (!response.ok) return null
  else return response.json()
}
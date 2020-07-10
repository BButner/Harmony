import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'

export const fetchPlaylist = async (ctx) => {
  const response = await fetch(`${Config.apiUrl}${ctx}/playlists`, {
    credentials: 'include'
  })

  if (!response.ok) return [{ error: { status: response.status } }]
  else return response.json()
}

import { Song } from 'models/service/ModelService'

export const handleSongSelection = (song: Song, selectedSongs: Song[], setSelectedSongs: Function, service: string): void => {
  if (selectedSongs.map(s => s.id).includes(song.id)) { // If the song has been selected
    setSelectedSongs(
      selectedSongs.filter(s => s.id !== song.id)
    )
    saveToLocalStorage(selectedSongs.filter(s => s.id !== song.id), service)
  } else { // The song has not been selected
    setSelectedSongs(selectedSongs.concat(song))
    saveToLocalStorage(selectedSongs.concat(song), service)
  }
}

export const songIsSelected = (song: Song, selectedSongs: Song[]): boolean => {
  return selectedSongs.filter(s => s.id === song.id).length > 0
}

export const hydrateFromLocalStorage = (setSelectedSongs: Function, service: string): Song[] => {
  const songs: string = localStorage.getItem(service + 'selectedSongIds')

  if (songs !== null) {
    return JSON.parse(songs)
  } else return []
}

const saveToLocalStorage = (selectedSongs: Song[], service: string): void => {
  localStorage.setItem(service + 'selectedSongIds', JSON.stringify(selectedSongs))
}
export const clearSelectedSongs = (service: string, setSelectedSongs: Function): void => {
  setSelectedSongs([])
  localStorage.setItem(service + 'selectedSongIds', JSON.stringify([]))
}
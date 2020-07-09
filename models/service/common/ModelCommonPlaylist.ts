import { PlaylistError, Song } from './ModelCommonGeneric'

export class UnifiedPlaylistData {
  name: string;
  description: string;
  error: PlaylistError;
  href: string;
  id: string;
  songCount: number;
  songs: Song[];
  uri: string;

  constructor (name: string, description: string, error: PlaylistError, href: string, id: string, uri: string, songCount: number, songs: Song[]) {
    this.name = name
    this.description = description
    this.error = error
    this.href = href
    this.id = id
    this.songCount = songCount
    this.songs = songs
    this.uri = uri
  }
}

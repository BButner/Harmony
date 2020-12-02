import { UnifiedAlbum, UnifiedArtist } from './ModelServiceGeneric'

export interface UnifiedSong {
  album: UnifiedAlbum;
  artists: UnifiedArtist[];
  explicit: boolean;
  uri: string;
  id: string;
  name: string;
}
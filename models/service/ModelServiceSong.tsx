import { ModelUnifiedAlbum, ModelUnifiedArtist } from './ModelServiceGeneric'

export interface ModelUnifiedSong {
  album: ModelUnifiedAlbum;
  artists: ModelUnifiedArtist[];
  explicit: boolean;
  uri: string;
  id: string;
  name: string;
}
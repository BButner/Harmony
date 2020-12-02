export interface UnifiedArtist {
  name: string;
  uri: string;
  id: string;
}

export interface UnifiedAlbum {
  artists: UnifiedArtist[];
  uri: string;
  id: string;
  name: string;
  imageHref: string;
}
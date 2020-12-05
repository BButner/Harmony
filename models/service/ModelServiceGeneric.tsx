export interface ModelUnifiedArtist {
  name: string;
  uri: string;
  id: string;
}

export interface ModelUnifiedAlbum {
  artists: ModelUnifiedArtist[];
  uri: string;
  id: string;
  name: string;
  imageHref: string;
}
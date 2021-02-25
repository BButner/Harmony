export interface Playlist {
  name: string;
  description: string;
  uri: string;
  id: string;
  imageHref: string;
}

export interface Artist {
  name: string;
  uri: string;
  id: string;
}

export interface Album {
  artists: Artist[];
  uri: string;
  id: string;
  name: string;
  imageHref: string;
}

export interface Song {
  album: Album;
  artists: Artist[];
  explicit: boolean;
  uri: string;
  id: string;
  name: string;
}
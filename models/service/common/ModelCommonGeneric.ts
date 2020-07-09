export class Artist {
  name: string;
  href: string;
  id: string;

  constructor (name: string, href: string, id: string) {
    this.name = name
    this.href = href
    this.id = id
  }
}

export class Album {
  artists: Artist[];
  href: string;
  id: string;
  name: string;

  constructor (artists: Artist[], href: string, id: string, name: string) {
    this.artists = artists
    this.href = href
    this.id = id
    this.name = name
  }
}

export class PlaylistError {
  status: number;
  message: string;

  constructor (status: number, message: string) {
    this.status = status
    this.message = message
  }
}

export class Song {
  album: Album;
  artists: Artist[];
  explicit: boolean;
  href: string;
  id: string;
  name: string;

  constructor (album: Album, artists: Artist[], explicit: boolean, href: string, id: string, name: string) {
    this.album = album
    this.artists = artists
    this.explicit = explicit
    this.href = href
    this.id = id
    this.name = name
  }
}
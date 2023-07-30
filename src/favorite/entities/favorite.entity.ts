export class Favorite {
  artists: string[];
  albums: string[];
  tracks: string[];
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export const FAVORITE = {
  ARTIST: 'artist',
  TRACK: 'track',
  ALBUM: 'album',
};

import { Songs } from '../shared/songs.model';

export class Music {
  public id: string;
  public artist: string;
  public album: string;
  public albumCoverUrl: string;
  public releaseDate: string;
  public songs: Songs[];

  constructor(
    artist: string,
    album: string,
    albumCoverUrl: string,
    releaseData: string,
    songs: Songs[]
  ) {
    this.artist = artist;
    this.album = album;
    this.albumCoverUrl = albumCoverUrl;
    this.releaseDate = releaseData;
    this.songs = songs;
  }
}

import { Songs } from '../shared/songs.model';

export class Album {
  public id: string;
  public artist: string;
  public title: string;
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
    this.id = artist;
    this.title = album;
    this.albumCoverUrl = albumCoverUrl;
    this.releaseDate = releaseData;
    this.songs = songs;
  }
}

import { Songs } from '../shared/songs.model';

export class Album {
  public id: string;
  public artist: string;
  public title: string;
  public albumCoverUrl: string;
  public releaseDate: string;
  public songs: Songs[];

  constructor(
    id: string,
    artist: string,
    title: string,
    albumCoverUrl: string,
    releaseData: string,
    songs: Songs[]
  ) {
    this.id = id;
    this.artist = artist;
    this.title = title;
    this.albumCoverUrl = albumCoverUrl;
    this.releaseDate = releaseData;
    this.songs = songs;
  }
}

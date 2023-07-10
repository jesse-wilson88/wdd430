import { Songs } from '../shared/songs.model';

export class Album {
  public id: string;
  public artist: string;
  public title: string;
  public coverUrl: string;
  public releaseDate: string;
  // public songs: Songs[];

  constructor(
    id: string,
    artist: string,
    title: string,
    coverUrl: string,
    releaseDate: string,
    // songs: Songs[]
  ) {
    this.id = id;
    this.artist = artist;
    this.title = title;
    this.coverUrl = coverUrl;
    this.releaseDate = releaseDate;
    // this.songs = songs;
  }
}

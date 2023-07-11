// import { Songs } from '../shared/songs.model';

export class Album {
  //   public id: string;
  //   public artist: string;
  //   public title: string;
  //   public coverUrl: string;
  //   public releaseDate: string;
  // public songs: Songs[];

  constructor(
    public id: string,
    public artist: string,
    public title: string,
    public coverUrl: string,
    public releaseDate: string
  ) {}
}

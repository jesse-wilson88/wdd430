import { Album } from './album.model';
import { Songs } from '../shared/songs.model';

export const MOCKALBUMS: Album[] = [
  {
    id: '1',
    artist: 'Queen',
    album: 'News Of The World',
    albumCoverUrl:
      'https://en.wikipedia.org/wiki/News_of_the_World_%28album%29',
    releaseDate: '28 Oct 1977',
    songs: [
      {
        trackNumber: '1',
        songTitle: 'We Will Rock You',
      },
      {
        trackNumber: '2',
        songTitle: 'We Are The Champions',
      },
    ],
  },
];

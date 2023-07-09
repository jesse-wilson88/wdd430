import { Album } from './album.model';
import { Songs } from '../shared/songs.model';

export const MOCKALBUMS: Album[] = [
  {
    id: '1',
    artist: 'Queen',
    title: 'News Of The World',
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
  {
    id: '2',
    artist: 'Queen',
    title: 'A Night At The Opera',
    albumCoverUrl:
      'https://en.wikipedia.org/wiki/A_Night_at_the_Opera_%28Queen_album%29',
    releaseDate: '21 Nov 1975',
    songs: [
      {
        trackNumber: '1',
        songTitle: 'Death on Two Legs (Dedicated to...)',
      },
      {
        trackNumber: '2',
        songTitle: 'Lazing on a Sunday Afternoon',
      },
    ],
  },
];

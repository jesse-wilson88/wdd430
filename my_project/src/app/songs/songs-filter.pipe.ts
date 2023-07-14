import { Pipe, PipeTransform } from '@angular/core';

import { Song } from './song.model';

@Pipe({
  name: 'songsFilter',
})
export class SongsFilterPipe implements PipeTransform {
  transform(songs: Song[], term): any {
    let filteredSongs: Song[] = [];

    if (term && term.length > 0) {
      filteredSongs = songs.filter((song: Song) =>
        song.title.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (filteredSongs.length < 1) {
      return songs;
    }
    return filteredSongs;
  }
}

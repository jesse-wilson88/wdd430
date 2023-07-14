import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map } from 'rxjs';

import { Song } from './song.model';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  songListChangedEvent = new Subject<Song[]>();
  songs: Song[] = [];
  song: Song;
  maxSongId: number;

  constructor(private http: HttpClient) {}

  getSongs(): Song[] {
    this.http
      .get<{ message: string; songs: Song[] }>('http://127.0.0.1:3000/songs')
      .pipe(
        map((responseData) => {
          const songs: Song[] = responseData.songs;
          return songs;
        })
      )
      .subscribe((responseData) => {
        this.songs = responseData;
        this.sortAndSend();
      }),
      (error: any) => {
        console.log('Error: ', error);
      };
    return this.songs;
  }

  getSong(id: string) {
    return this.songs.find((song) => song.id === id);
  }

  getMaxId(): number {
    let maxId = 0;

    for (const songEl of this.songs) {
      const currentId = Number(songEl.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addSong(song: Song) {
    if (!song) {
      return;
    }

    // make sure id of the new Song is empty
    song.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; song: Song }>(
        'http://127.0.0.1:3000/songs',
        song,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new song to songs
        this.songs.push(responseData.song);
        this.sortAndSend();
      });
    this.getSongs();
  }

  updateSong(originalSong: Song, newSong: Song) {
    if (!originalSong || !newSong) {
      return;
    }

    const pos = this.songs.findIndex((d) => d.id === originalSong.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Song to the id of the old Song
    newSong.id = originalSong.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://127.0.0.1:3000/songs/' + originalSong.id, newSong, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.songs[pos] = newSong;
        this.sortAndSend();
      });
    this.getSongs();
  }

  deleteSong(song: Song) {
    if (!song) {
      return;
    }

    const pos = this.songs.findIndex((d) => d.id === song.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://127.0.0.1:3000/songs/' + song.id)
      .subscribe((response: Response) => {
        this.songs.splice(pos, 1);
        this.sortAndSend();
        this.getSongs();
      });
  }

  sortAndSend() {
    this.songs.sort((a, b) =>
      a.artist > b.artist ? 1 : b.artist > a.artist ? -1 : 0
    );
    this.songListChangedEvent.next(this.songs.slice());
  }
}

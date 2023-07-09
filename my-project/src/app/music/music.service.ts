import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Music } from './music.models';
import { MOCKALBUMS } from './MOCKALBUMS';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  musicListChangedEvent = new Subject<Music[]>();
  private albums: Music[] = [];
  maxAlbumId: number;

  constructor() {
    this.albums = MOCKALBUMS;
    this.maxAlbumId = this.getMaxId();
  }

  getMaxId() {
    let maxId = 0;

    for (const albumEl of this.albums) {
      const currentId = Number(albumEl.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getAlbums(): Music[] {
    return this.albums
      .sort((a, b) => (a.artist > b.artist ? 1 : b.artist > b.artist ? -1 : 0))
      .slice();
  }

  getAlbum(id: string): Music | null {
    return this.albums.find((c) => c.id === id);
  }

  addAlbum(newAlbum: Music) {
    if (!newAlbum) {
      return;
    }

    this.maxAlbumId++;
    newAlbum.id = this.maxAlbumId.toString();
    this.albums.push(newAlbum);
    const musicListClone = this.albums.slice();
    this.musicListChangedEvent.next(musicListClone);
  }

  updateAlbum(originalAlbum: Music, newAlbum: Music) {
    if (!originalAlbum || !newAlbum) {
      return;
    }

    const pos = this.albums.indexOf(originalAlbum);
    if (pos < 0) {
      return;
    }

    newAlbum.id = originalAlbum.id;
    this.albums[pos] = newAlbum;

    const musicListClone = this.albums.slice();
    this.musicListChangedEvent.next(musicListClone);
  }

  deleteAlbum(music: Music) {
    if (!music) {
      return;
    }

    const pos = this.albums.indexOf(music);
    if (pos < 0) {
      return;
    }

    this.albums.splice(pos, 1);
    const musicListClone = this.albums.slice();
    this.musicListChangedEvent.next(musicListClone);
  }
}

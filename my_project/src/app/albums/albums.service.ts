import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map } from 'rxjs';

import { Album } from './album.model';
// import { MOCKALBUMS } from './MOCKALBUMS';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  albumListChangedEvent = new Subject<Album[]>();
  private albums: Album[] = [];
  album: Album;
  maxAlbumId: number;

  constructor(private http: HttpClient) {
    // this.albums = MOCKALBUMS;
    // this.maxAlbumId = this.getMaxId();
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

  getAlbums(): Album[] {
    // console.log('Gettin the albums');
    // return this.albums
    //   .sort((a, b) => (a.artist > b.artist ? 1 : b.artist > b.artist ? -1 : 0))
    //   .slice();
    this.http
      .get<{ message: string; album: Album[] }>(
        'http://127.0.0.1:3000/contacts'
      )
      .pipe(
        map((responseData) => {
          const albums: Album[] = responseData.album;
          return albums;
        })
      )
      .subscribe((responseData) => {
        this.albums = responseData;
        this.sortAndSend();
      }),
      (error: any) => {
        console.log('Error: ', error);
      };
    return this.albums;
  }

  getAlbum(id: string): Album | null {
    return this.albums.find((c) => c.id === id);
  }

  addAlbum(newAlbum: Album) {
    if (!newAlbum) {
      return;
    }

    this.maxAlbumId++;
    newAlbum.id = this.maxAlbumId.toString();
    this.albums.push(newAlbum);
    const albumListClone = this.albums.slice();
    this.albumListChangedEvent.next(albumListClone);
  }

  updateAlbum(originalAlbum: Album, newAlbum: Album) {
    if (!originalAlbum || !newAlbum) {
      return;
    }

    const pos = this.albums.indexOf(originalAlbum);
    if (pos < 0) {
      return;
    }

    newAlbum.id = originalAlbum.id;
    this.albums[pos] = newAlbum;

    const albumListClone = this.albums.slice();
    this.albumListChangedEvent.next(albumListClone);
  }

  deleteAlbum(album: Album) {
    if (!album) {
      return;
    }

    const pos = this.albums.indexOf(album);
    if (pos < 0) {
      return;
    }

    this.albums.splice(pos, 1);
    const albumListClone = this.albums.slice();
    this.albumListChangedEvent.next(albumListClone);
  }

  sortAndSend() {
    this.albums.sort((a, b) =>
      a.artist > b.artist ? 1 : b.artist > a.artist ? -1 : 0
    );
    this.albumListChangedEvent.next(this.albums.slice());
  }
}

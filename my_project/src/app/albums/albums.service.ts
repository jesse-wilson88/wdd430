import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, map } from 'rxjs';

import { Album } from './album.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  albumListChangedEvent = new Subject<Album[]>();
  albums: Album[] = [];
  album: Album;
  maxAlbumId: number;

  constructor(private http: HttpClient) {}

  getAlbums(): Album[] {
    this.http
      .get<{ message: string; albums: Album[] }>('http://127.0.0.1:3000/albums')
      .pipe(
        map((responseData) => {
          const albums: Album[] = responseData.albums;
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

  getAlbum(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  getMaxId(): number {
    let maxId = 0;

    for (const albumEl of this.albums) {
      const currentId = Number(albumEl.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addAlbum(album: Album) {
    if (!album) {
      return;
    }

    // make sure id of the new Album is empty
    album.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; album: Album }>(
        'http://127.0.0.1:3000/albums',
        album,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new album to albums
        this.albums.push(responseData.album);
        this.sortAndSend();
      });
    this.getAlbums();
  }

  updateAlbum(originalAlbum: Album, newAlbum: Album) {
    if (!originalAlbum || !newAlbum) {
      return;
    }

    const pos = this.albums.findIndex((d) => d.id === originalAlbum.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Album to the id of the old Album
    newAlbum.id = originalAlbum.id;
    // newAlbum._id = originalAlbum._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://127.0.0.1:3000/albums/' + originalAlbum.id, newAlbum, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.albums[pos] = newAlbum;
        this.sortAndSend();
      });
    console.log('Album Deleted');
    this.getAlbums();
  }

  deleteAlbum(album: Album) {
    if (!album) {
      return;
    }

    const pos = this.albums.findIndex((d) => d.id === album.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://127.0.0.1:3000/albums/' + album.id)
      .subscribe((response: Response) => {
        this.albums.splice(pos, 1);
        this.sortAndSend();
        this.getAlbums();
      });
    // this.getAlbums();
  }

  sortAndSend() {
    this.albums.sort((a, b) =>
      a.artist > b.artist ? 1 : b.artist > a.artist ? -1 : 0
    );
    this.albumListChangedEvent.next(this.albums.slice());
  }
}

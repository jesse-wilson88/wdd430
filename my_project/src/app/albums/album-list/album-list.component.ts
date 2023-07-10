import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Album } from '../album.model';
import { AlbumsService } from '../albums.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  term: String;
  private subscription: Subscription;

  constructor(private albumsSerice: AlbumsService) {}

  ngOnInit() {
    this.subscription = this.albumsSerice.albumListChangedEvent.subscribe(
      (albums: Album[]) => {
        this.albums = albums;
      }
    );
    this.albumsSerice.getAlbums();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}

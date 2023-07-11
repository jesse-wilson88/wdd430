import { Component, OnInit } from '@angular/core';

// import { Album } from './album.model';
// import { AlbumsService } from './albums.service';

@Component({
  selector: 'app-album',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit {
  // selectedAlbum: Album;

  // constructor(private albumsService: AlbumsService) { }
  constructor() {}

  ngOnInit() {
    // this.albumsService.albumSelectedEvent.subscribe((album: Album) => {
    //   this.selectedAlbum = album;
    // })
  }
}

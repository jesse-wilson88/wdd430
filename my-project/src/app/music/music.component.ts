import { Component, OnInit } from '@angular/core';

// import { Music } from './music.models';
// import { MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit {
  // selectedAlbum: Music;

  // constructor(private musicService: MusicService) { }
  constructor() { }

  ngOnInit() {
    // this.musicService.albumSelectedEvent.subscribe((music: Music) => {
    //   this.selectedAlbum = music;
    // })
  }
}

import { Component, OnInit } from '@angular/core';
import { Music } from '../music.models';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css'],
})
export class MusicListComponent implements OnInit {
  music: Music[] = [
    new Music(
      'Queen',
      'The Game',
      'https://m.media-amazon.com/images/I/71UGXu-hM0L._SY355_.jpg',
      '30 June 1980',
      null
    ),
    new Music(
      'Queen',
      'A Night At The Opera',
      'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Queen_A_Night_At_The_Opera.png/220px-Queen_A_Night_At_The_Opera.png',
      '21 November 1975',
      null
    ),
  ];

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { Album } from '../album.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = [
    new Album(
      'Queen',
      'The Game',
      'https://m.media-amazon.com/images/I/71UGXu-hM0L._SY355_.jpg',
      '30 June 1980',
      null
    ),
    new Album(
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

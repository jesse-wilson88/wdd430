import { Component, Input, OnInit } from '@angular/core';

import { Song } from '../song.model';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css'],
})
export class SongItemComponent implements OnInit {
  @Input() song: Song;

  constructor() {}

  ngOnInit() {}
}

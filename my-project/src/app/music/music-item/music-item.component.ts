import { Component, Input, OnInit } from '@angular/core';

import { Music } from '../music.models';

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.css'],
})
export class MusicItemComponent implements OnInit {
  @Input() music: Music;

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Music } from '../music.models';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css'],
})
export class MusicDetailComponent implements OnInit {
  music: Music;

  constructor(
    private musicService: MusicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      // this.music = this.musicService.getMusic(id);
    });
  }

  onDelete() {
    this.musicService.deleteAlbum(this.music);
    this.router.navigateByUrl('/music');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Song } from '../song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song: Song;

  constructor(
    private songsService: SongsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.song = this.songsService.getSong(id);
    })
  }

  onDelete() {
    this.songsService.deleteSong(this.song);
    this.router.navigateByUrl('/songs');
  }
}

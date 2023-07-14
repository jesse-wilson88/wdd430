import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Song } from '../song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css'],
})
export class SongEditComponent implements OnInit {
  originalSong: Song;
  song: Song;
  editMode: boolean = false;
  id: string;

  constructor(
    private songsService: SongsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalSong = this.songsService.getSong(this.id);

      if (!this.originalSong) {
        return;
      }

      this.editMode = true;

      this.song = JSON.parse(JSON.stringify(this.originalSong));
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    console.log('Editmode: ' + this.editMode);
    const value = form.value;

    const newSong = new Song(
      '',
      value.artist,
      value.title,
      value.album,
      value.videoUrl
    );
    console.log(newSong);

    if (this.editMode) {
      this.songsService.updateSong(this.originalSong, newSong);
    } else {
      this.songsService.addSong(newSong);
    }

    this.router.navigate(['/songs']);
  }
}

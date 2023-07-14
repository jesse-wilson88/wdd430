import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Song } from '../song.model';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit, OnDestroy {
  songs: Song[] = [];
  term: String;
  private subscription: Subscription;

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.subscription = this.songsService.songListChangedEvent.subscribe(
      (songs: Song[]) => {
        this.songs = songs;
      }
    );
    this.songsService.getSongs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Album } from '../album.model';
import { AlbumsService } from '../albums.service';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css'],
})
export class AlbumEditComponent implements OnInit {
  originalAlbum: Album;
  album: Album;
  // songs: Album[] = [];
  editMode = false;
  id: string;
  // invalidAlbum = false;

  constructor(
    private albumsService: AlbumsService,
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

      this.originalAlbum = this.albumsService.getAlbum(this.id);

      if (this.originalAlbum) {
        return;
      }

      this.editMode = true;

      this.album = JSON.parse(JSON.stringify(this.originalAlbum));

      // if (this.originalAlbum.songs && this.originalAlbum.songs.length > 0) {
      //   this.songs = JSON.parse(JSON.stringify(this.originalAlbum.songs));
      // }
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // isInvalidAlbum(newAlbum: Album) {
  //   if (!newAlbum) {
  //     return (this.invalidAlbum = true);
  //   }

  //   if (this.album && newAlbum.id === this.album.id) {
  //     return (this.invalidAlbum = true);
  //   }

  //   for (let i = 0; i < this.songs.length; i++) {
  //     if (newAlbum.id === this.songs[i].id) {
  //       return (this.invalidAlbum = true);
  //     }
  //   }
  //   return (this.invalidAlbum = false);
  // }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAlbum = new Album(
      '',
      value.artist,
      value.title,
      value.coverUrl,
      value.releaseDate
    );

    if (this.editMode) {
      this.albumsService.updateAlbum(this.originalAlbum, newAlbum);
    } else {
      this.albumsService.addAlbum(newAlbum);
    }

    this.router.navigate(['/albums']);
  }
}

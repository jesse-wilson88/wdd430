import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumEditComponent } from './albums/album-edit/album-edit.component';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { SongsComponent } from './songs/songs.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  {
    path: 'albums',
    component: AlbumsComponent,
    children: [
      { path: 'new', component: AlbumEditComponent },
      { path: ':id', component: AlbumDetailComponent },
      { path: ':id/edit', component: AlbumEditComponent },
    ],
  },
  {
    path: 'songs',
    component: SongsComponent,
    children: [
      { path: 'new', component: SongEditComponent },
      { path: ':id', component: SongDetailComponent },
      { path: ':id/edit', component: SongEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

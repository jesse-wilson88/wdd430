import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumListComponent } from './albums/album-list/album-list.component';
import { AlbumItemComponent } from './albums/album-item/album-item.component';
import { AlbumEditComponent } from './albums/album-edit/album-edit.component';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { AlbumsFilterPipe } from './albums/albums-filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SongsComponent } from './songs/songs.component';
import { SongListComponent } from './songs/song-list/song-list.component';
import { SongItemComponent } from './songs/song-item/song-item.component';
import { SongEditComponent } from './songs/song-edit/song-edit.component';
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongsFilterPipe } from './songs/songs-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlbumsComponent,
    AlbumListComponent,
    AlbumItemComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    AlbumsFilterPipe,
    SongsComponent,
    SongListComponent,
    SongItemComponent,
    SongEditComponent,
    SongDetailComponent,
    SongsFilterPipe
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

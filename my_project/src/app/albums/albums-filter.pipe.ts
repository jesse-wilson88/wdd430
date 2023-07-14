import { Pipe, PipeTransform } from '@angular/core';

import { Album } from './album.model';

@Pipe({
  name: 'albumsFilter',
})
export class AlbumsFilterPipe implements PipeTransform {
  transform(albums: Album[], term): any {
    let filteredAlbums: Album[] = [];

    if (term && term.length > 0) {
      filteredAlbums = albums.filter((album: Album) =>
        album.title.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (filteredAlbums.length < 1) {
      return albums;
    }
    return filteredAlbums;
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MusicComponent } from './music/music.component';
import { MusicEditComponent } from './music/music-edit/music-edit.component';
import { MusicDetailComponent } from './music/music-detail/music-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/music', pathMatch: 'full' },
  {
    path: 'music',
    component: MusicComponent,
    children: [
      { path: 'new', component: MusicEditComponent },
      { path: ':id', component: MusicDetailComponent },
      { path: ':id/edit', component: MusicEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

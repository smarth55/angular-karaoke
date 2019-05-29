import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { SongSelectEvent } from './song-list/song-list.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { PlayerComponent } from './player/player.component';
import { Song } from './services/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild(SongDetailsComponent, { static: false }) songDetails: SongDetailsComponent;
  @ViewChild(PlayerComponent, { static: true }) player: PlayerComponent;

  title = 'Karaoke Jams';
  showVideo: boolean = false;

  private selectedSong: Song;

  onSongSelect($event: SongSelectEvent) {
    this.sidenav.toggle();

    if (this.selectedSong && this.selectedSong.id === $event.song.id) return;

    this.selectedSong = $event.song;
    this.songDetails.loadSong(this.selectedSong);
    this.player.loadSong(this.selectedSong);
  }
}

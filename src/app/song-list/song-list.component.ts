import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { SongService, Song } from '../services/song.service';

export interface SongSelectEvent {
  song: Song,
  component: SongListComponent
}

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  @Output() select: EventEmitter<SongSelectEvent> = new EventEmitter<SongSelectEvent>();

  songs: Observable<Song[]>;

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songs = this.songService.getSongList();
  }

  selectSong(song: Song) {
    this.select.emit({song, component: this});
  }
}

import { Component, OnInit } from '@angular/core';

import { Song } from '../services/song.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {
  public song: Song = {
    id: 0,
    title: '',
    album: '',
    artist: '',
    artPath: 'assets/images/default.jpg',
    audioPath: '',
    avatarPath: 'assets/images/avatar.png',
    lyricPath: ''
  }

  constructor() { }

  ngOnInit() {
  }

  loadSong(song: Song) {
    this.song = song;
  }
}

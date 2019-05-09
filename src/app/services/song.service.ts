import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  avatarPath: string;
  audioPath: string;
  artPath: string;
  lyricPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  constructor(private http: HttpClient) { }

  getSongList() {
    return this.http.get<Song[]>('assets/songs/songs.json');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import LRC from 'lrc.js';

export interface Line {
  idx: number;
  time: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class LyricsService {
  constructor(private http: HttpClient) { }

  getLyrics(url: string) {
    return this.http.get(url, {responseType: 'text'})
      .pipe(map(res => {
        return LRC.parse(res);
      }));
  }
}

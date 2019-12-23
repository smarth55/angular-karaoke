import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { Song } from '../services/song.service';
import { LyricsService, Line } from '../services/lyrics.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  public isPlaying: boolean = false;
  public hideLyrics: boolean = false;
  public progress: number = 0;
  public currentLine: Line;
  public previousLine: Line;
  public nextLine: Line;

  private lines: any;
  private song: Song;
  private audio: HTMLAudioElement;
  private timeSubscription: Subscription;
  private loadedSubscription: Subscription;
  // private playingSubscription: Subscription;
  // private pausedSubscription: Subscription;

  constructor(private lyrics: LyricsService) { }

  ngOnInit() {
    this.audio = new Audio();
    this.timeSubscription = fromEvent(this.audio, 'timeupdate').subscribe(this.handleTimeUpdated.bind(this));
    this.loadedSubscription = fromEvent(this.audio, 'loadeddata').subscribe(this.handleAudioLoaded.bind(this));
    // this.playingSubscription = fromEvent(this.audio, 'playing').subscribe(event => console.log('audio playing', event));
    // this.pausedSubscription = fromEvent(this.audio, 'pause').subscribe(event => console.log('audio paused', event));
  }

  ngOnDestroy() {
    // there isn't navigation in this app, but we can still do this to be safe.
    this.timeSubscription.unsubscribe();
    this.loadedSubscription.unsubscribe();
    // this.playingSubscription.unsubscribe();
    // this.pausedSubscription.unsubscribe();
  }

  loadSong(song: Song) {
    this.lyrics.getLyrics(song.lyricPath).subscribe((res: any) => {
      this.lines = res;
    });
    this.song = song;
    this.progress = 0;
    this.audio.pause();
    this.audio.src = song.audioPath;
  }

  handleAudioLoaded(event: Event) {
    console.log('audio loaded', event);
  }

  handleTimeUpdated(event: Event) {
    if ( this.isPlaying && this.lines ) {
      let time = this.audio.currentTime;
      this.currentLine = this.lines.currentLine(time);
      this.previousLine = this.lines.previousLine(time);
      this.nextLine = this.lines.nextLine(time);
    }

    if ( this.audio.duration && this.audio.currentTime ) {
      this.progress = (this.audio.currentTime / this.audio.duration) * 100;
    } else {
      this.progress = 0;
    }
  }

  toggle() {
    if ( !this.song ) return;
    if ( this.audio.paused ) {
      this.play();
    } else {
      this.pause();
    }
  }

  private pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  private play() {
    this.audio.play();
    this.isPlaying = true;
  }

  toggleLyrics() {
    this.hideLyrics = !this.hideLyrics;
  }
}

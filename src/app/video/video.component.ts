import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { BodyPixService } from '../services/body-pix.service';

const backgroundImages = [
  'background-1.png',
  'background-2.png'
];

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  private background: HTMLImageElement;
  private currentBackground: String;
  private backgroundSubscription: Subscription;
  private dead: boolean = false;

  constructor(private bodyPix: BodyPixService) {}

  async ngOnInit() {

    // need to load all images first, then set one as the background

    this.background = new Image();
    this.getNewBackground();
    this.backgroundSubscription = interval(5000).subscribe(this.getNewBackground.bind(this));

    const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});

    let videoElm = this.video.nativeElement;
    videoElm.srcObject = stream;
    videoElm.onloadedmetadata = () => {
      videoElm.width = videoElm.videoWidth;
      videoElm.height = videoElm.videoHeight;

      this.canvas.nativeElement.height = videoElm.videoHeight;
      this.canvas.nativeElement.width = videoElm.videoWidth;
      this.renderVideo();
    };
    videoElm.play();
  }

  getNewBackground() {
    let index = Math.floor(Math.random() * backgroundImages.length);
    let newBackground = backgroundImages[index];
    if (newBackground === this.currentBackground) {
      this.getNewBackground();
    } else {
      this.currentBackground = newBackground;
      this.background.src = `/assets/images/${this.currentBackground}`;
    }
  }

  async renderVideo() {
    this.bodyPix.drawGreenScreen(
      this.canvas.nativeElement,
      this.video.nativeElement,
      this.background
    );

    if (!this.dead ) requestAnimationFrame(this.renderVideo.bind(this));
  }

  ngOnDestroy() {
    this.dead = true;
    this.backgroundSubscription.unsubscribe();
    let srcObject: any = this.video.nativeElement.srcObject;
    srcObject.getTracks().forEach(track => track.stop());
    this.video.nativeElement.srcObject = null;
  }
}

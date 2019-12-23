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

  private backgroundImages: Array<HTMLImageElement> = [];
  private background: HTMLImageElement;
  private currentBackgroundIndex: Number;
  private backgroundSubscription: Subscription;
  private dead: boolean = false;

  constructor(private bodyPix: BodyPixService) {}

  async ngOnInit() {
    backgroundImages.forEach(src => {
      let image = new Image();
      image.src = `/assets/images/${src}`;
      this.backgroundImages.push(image);
    })

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
    if (index === this.currentBackgroundIndex) {
      this.getNewBackground();
    } else {
      this.currentBackgroundIndex = index;
      this.background = this.backgroundImages[index];
    }
  }

  async renderVideo() {
    if (this.dead) return;

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

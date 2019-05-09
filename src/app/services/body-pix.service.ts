import { Injectable } from '@angular/core';
import * as bodyPix from '@tensorflow-models/body-pix';
import { drawGreenScreenEffect, ImageType } from './video-utils';

@Injectable({
  providedIn: 'root'
})
export class BodyPixService {
  private net: bodyPix.BodyPix;

  constructor() {
    this.init();
  }

  async init() {
    if (!this.net) {
      this.net = await bodyPix.load();
    }
  }

  async drawGreenScreen(canvas: HTMLCanvasElement, image: ImageType, background: ImageType) {
    if (!this.net) return;
    let personSegmentation = await this.net.estimatePersonSegmentation(image);
    drawGreenScreenEffect(canvas, image, background, personSegmentation);
  }
}

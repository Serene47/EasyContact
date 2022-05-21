import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../core/model/app.value';
import { CaptureService } from '../core/service/capture.service';
import { GeneralService } from '../core/service/general.service';
import { WINDOW } from '../core/tokens/browser';

@Component({
  selector: 'app-camera-content',
  templateUrl: './camera-content.component.html',
  styleUrls: ['./camera-content.component.scss']
})
export class CameraContentComponent implements OnInit {

  isStreaming = false;
  isCameraError = false;

  errorMessage?: string;

  imageSource?: string;

  canvasWidth!: number;
  canvasHeight!: number;

  windowResizeSubscription!: Subscription;

  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(WINDOW) private window: Window,
    private captureService: CaptureService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {

    this.initializeCamera();

  }

  initializeCamera() {

    this.captureService.getStream()
      .subscribe({
        next: stream => {

          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();

        },
        error: ({ message, code }) => {

          this.isCameraError = true;

          switch (code) {

            case 0:
              this.errorMessage = "You have denied permission to access camera.";
              break;
            default:
              this.errorMessage = message;
              break;

          }

        }
      })

  }

  onPlayerReady() {

    this.isStreaming = true;

  }

  capture() {

    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;

    const image = this.captureService.capture(video, canvas);

    this.generalService.capturedImage$.next(image);
    this.generalService.state$.next(AppState.PROCESSING);

  }

}

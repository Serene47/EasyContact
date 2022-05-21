import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NAVIGATOR } from "../tokens/browser";

@Injectable({
  providedIn: "root"
})
export class CaptureService {

  constructor(
    @Inject(NAVIGATOR) private window: Window,
    @Inject(NAVIGATOR) private navigator: Navigator,
  ) { }

  getStream() {

    return new Observable<MediaStream>(

      subscriber => {

        if (!this.navigator)
          subscriber.error({ code: -1, message: "Please use an internet browser." });

        if (!this.navigator.mediaDevices) {

          if (this.window.location.protocol != "https")
            subscriber.error({ code: -2, message: "Please use 'https' version of this app." });

          subscriber.error({ code: -3, message: "Your device doesn't have a media device." });

        }


        this.navigator.mediaDevices.
          getUserMedia({ video: { facingMode: "environment" }, audio: false, })
          .then(
            stream => { subscriber.next(stream); subscriber.complete(); }
          )
          .catch(
            error => { subscriber.error(error) }
          )

      }

    )

  }

  capture(video: HTMLVideoElement, canvas: HTMLCanvasElement) {

    const { width, height } = video.getBoundingClientRect();
    const videoWidth = video.videoWidth, videoHeight = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d")!;

    context.fillStyle = "#FFF";
    context.clearRect(0, 0, width, height);

    /* video element set to 'object-fit:cover'. 
     * So the stream will be placed center and overflowing portion  
     * of the stream is clipped.
     * So we have to find the actual portion of stream to displayed 
     */

    const xOffset = Math.max((videoWidth - width) / 2, 0);
    const yOffset = Math.max((videoHeight - height) / 2, 0);

    context.drawImage(video, 0, 0, width, height,
      xOffset, yOffset, width, height);

    return canvas.toDataURL("image/png")

  }


}
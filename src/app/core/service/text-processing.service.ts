import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { createWorker, Worker } from "tesseract.js";
import { ParsedResult } from "../model/app.types";

@Injectable({
  providedIn: "root"
})
export class TextProcessingService {

  tesseractLog$ = new Subject<any>();
  tesseractError$ = new Subject<any>();

  result$ = new Subject<ParsedResult>();
  jobId$ = new Subject<string>();

  prevJobId: string | null = null;

  worker!: Worker;

  constructor() {
    this.initWorker();
  }

  initWorker() {

    this.worker = createWorker({
      logger: log => {
        this.tesseractError$.next(log)
      },
      errorHandler: error => {
        this.tesseractError$.next(error);
      }
    })

  }

  getStatus(jobId: string) {

  }

  extractData(image: string) {

    return new Observable<string>(

      subscriber => {

        (async () => {

          if (this.prevJobId)
            await this.worker.terminate(this.prevJobId);

          let { jobId } = await this.worker.load();

          this.prevJobId = jobId;
          this.jobId$.next(jobId);

          await this.worker.loadLanguage("eng");
          await this.worker.initialize("eng");

          const { data: { text } } = await this.worker.recognize(image);

          this.prevJobId = null;

          subscriber.next(text);
          subscriber.complete();

        })();

      }

    )


  }


}
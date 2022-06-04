import { Injectable } from "@angular/core";
import { filter, map, Observable, Subject } from "rxjs";
import { createWorker, Worker } from "tesseract.js";
import { ParsedResult } from "../model/app.types";
import { CAPITAL_CASE_NAME_REGEX, EMAIL_REGEX, GENERIC_NAME_REGEX, LETTER_ONLY_NAME_REGEX, PHONE_REGEX, TITLE_CASE_NAME_REGEX } from "../model/app.value";

@Injectable({
  providedIn: "root"
})
export class TextProcessingService {

  tesseractLog$ = new Subject<any>();
  tesseractError$ = new Subject<any>();

  jobId$ = new Subject<string>();

  prevJobId: string | null = null;

  worker!: Worker;

  constructor() {
    this.initWorker();
  }

  initWorker() {

    this.worker = createWorker({
      logger: log => {

        let { jobId, progress } = log;

        console.log({ jobId, progress })
        this.tesseractLog$.next(log)
      },
      errorHandler: error => {
        this.tesseractError$.next(error);
      }
    })

  }

  get progress$() {

    return this.tesseractLog$
      .pipe(
        filter(log => log.status == "recognizing text"),
        map(log => log.progress)
      )

  }

  getContent(image: string) {

    return new Observable<string>(

      subscriber => {

        (async () => {

          //if (this.prevJobId)
          //await this.worker.terminate(this.prevJobId);

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

  extractData(textContent: string): ParsedResult {

    let phones = textContent.match(PHONE_REGEX);

    phones = phones?.map(phone => phone.replace(/[\s]/g, "")) ?? [];

    let emails = textContent.match(EMAIL_REGEX);

    emails = emails?.map(email => email.replace(/[\s]/g, "")) ?? [];

    let first50Text = textContent.substring(0, 50);

    let first50CapitalCaseNames = first50Text.match(CAPITAL_CASE_NAME_REGEX);

    let first50TitleCaseNames = first50Text.match(TITLE_CASE_NAME_REGEX);

    let first50Names = [
      ...first50CapitalCaseNames ?? [],
      ...first50TitleCaseNames ?? []
    ].map(name => name.trim())

    let allCapitalCaseNames = textContent.match(CAPITAL_CASE_NAME_REGEX);

    let allTitleCaseNames = textContent.match(CAPITAL_CASE_NAME_REGEX);

    let allLetterOnlyNames = textContent.match(LETTER_ONLY_NAME_REGEX);

    let allGenericNames = textContent.match(GENERIC_NAME_REGEX);

    let allNames = [
      ...allCapitalCaseNames ?? [],
      ...allTitleCaseNames ?? [],
      ...allLetterOnlyNames ?? [],
      ...allGenericNames ?? []
    ].map(name => name.trim())


    return {
      emails: emails,
      phones: phones,
      nameSuggestions: {
        first50: first50Names,
        all: allNames
      }
    }

  }


}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { ParsedResult } from '../core/model/app.types';
import { AppState } from '../core/model/app.value';
import { GeneralService } from '../core/service/general.service';
import { TextProcessingService } from '../core/service/text-processing.service';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit, OnDestroy {

  AppState = AppState;

  capturedImage: string | null = null;

  result: ParsedResult | null = null;

  progress = 0;

  capturedImageSubscription!: Subscription;
  progressSubscription!: Subscription;

  constructor(
    public generalService: GeneralService,
    public textProcessingService: TextProcessingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.listenImageCapture();
    this.listenProgress();
  }


  listenImageCapture() {

    this.capturedImageSubscription =
      this.generalService.capturedImage$
        .pipe(
          tap(image => { this.capturedImage = image; }),
          switchMap(
            image => {

              this.progress = 0;

              return this.textProcessingService.getContent(image)
            }
          ),
          map(
            imageContent => this.textProcessingService.extractData(imageContent)
          )
        )
        .subscribe(
          result => {

            this.result = result;

            this.generalService.state$.next(AppState.RESULT);

          }
        )

  }

  listenProgress() {

    this.progressSubscription =
      this.textProcessingService.progress$
        .subscribe(
          progress => { this.progress = progress * 100 }
        )

  }

  retake() {
    this.capturedImage = null;
    this.generalService.state$.next(AppState.STREAM)
  }

  ngOnDestroy(): void {
    this.capturedImageSubscription.unsubscribe();
    this.progressSubscription.unsubscribe();
  }

}

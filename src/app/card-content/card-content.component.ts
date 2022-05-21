import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../core/model/app.value';
import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit, OnDestroy {

  capturedImage: string | null = null;

  capturedImageSubscription!: Subscription;

  constructor(
    public generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.listenImageCapture();
  }

  listenImageCapture() {

    this.capturedImageSubscription =
      this.generalService.capturedImage$
        .subscribe(
          image => { this.capturedImage = image; }
        )

  }

  retake() {
    this.capturedImage = null;
    this.generalService.state$.next(AppState.STREAM)
  }

  ngOnDestroy(): void {
    this.capturedImageSubscription.unsubscribe();
  }

}

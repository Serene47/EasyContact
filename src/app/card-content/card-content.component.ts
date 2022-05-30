import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  form!: FormGroup;

  get phonesForm() {
    return <FormArray>this.form.get("phones")!
  };

  get emailsForm() {
    return <FormArray>this.form.get("emails")!
  };

  result: ParsedResult | null = null;

  progress = 0;

  capturedImageSubscription!: Subscription;
  progressSubscription!: Subscription;
  resultSubscription!: Subscription;

  constructor(
    public generalService: GeneralService,
    public textProcessingService: TextProcessingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.initForm();

    this.listenImageCapture();
    this.listenProgress();
    this.listenResult();
  }

  initForm() {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      phones: this.formBuilder.array([], [Validators.required]),
      emails: this.formBuilder.array([])
    });

  }

  listenImageCapture() {

    this.capturedImageSubscription =
      this.generalService.capturedImage$
        .subscribe(
          image => {
            this.capturedImage = image;
            this.progress = 0;
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

  listenResult() {

    this.resultSubscription =
      this.generalService.result$
        .subscribe(
          result => {

            this.result = result;

            this.emailsForm.clear();
            this.phonesForm.clear();
            this.form.reset();

            this.form.patchValue({ name: result.nameSuggestions.first50[0] })

            result.emails.forEach(
              email => {
                this.emailsForm.push(
                  this.formBuilder.control(email)
                )
              }
            );

            result.phones.forEach(
              phone => {
                this.phonesForm.push(
                  this.formBuilder.control(phone)
                )
              }
            );

          }
        )

  }

  retake() {
    this.capturedImage = null;
    this.generalService.state$.next(AppState.STREAM)
  }

  ngOnDestroy(): void {
    this.capturedImageSubscription.unsubscribe();
    this.progressSubscription.unsubscribe();
    this.resultSubscription.unsubscribe();
  }

}

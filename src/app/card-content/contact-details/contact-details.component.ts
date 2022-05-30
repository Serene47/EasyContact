import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ParsedResult } from 'src/app/core/model/app.types';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  @Input() result!: ParsedResult;
  @Input() form!: FormGroup;

  get phonesForm() {
    return <FormArray>this.form.get("phones")!
  };

  get emailsForm() {
    return <FormArray>this.form.get("emails")!
  };

  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void { }

  addControl(formName: "emails" | "phones") {

    const form = <FormArray>this.form.get(formName)!;

    form.push(this.formBuilder.control(null));

  }

  removeControl(formName: "emails" | "phones", index: number) {

    const form = <FormArray>this.form.get(formName)!;

    form.removeAt(index);

  }

  createCard() {

    this.formSubmitted = true;

  }


}

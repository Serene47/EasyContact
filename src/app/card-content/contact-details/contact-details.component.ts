import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParsedResult } from 'src/app/core/model/app.types';
import { VcardService } from 'src/app/core/service/vcard.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnChanges {

  @Input() result!: ParsedResult;

  form!: FormGroup;

  phonesForm!: FormArray;
  emailsForm!: FormArray;

  formSubmitted = false;

  suggestions!: string[];
  isShowMoreVissible = false;

  constructor(
    private formBuilder: FormBuilder,
    private vcardService: VcardService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes["result"]) {

      this.populateSuggestions();

      if (!this.form)
        this.initForm();

      this.populateForm();

    }

  }

  ngOnInit(): void {

  }

  initForm() {

    this.phonesForm = this.formBuilder.array([], [Validators.required]);
    this.emailsForm = this.formBuilder.array([]);

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      phones: this.phonesForm,
      emails: this.emailsForm
    });

  }

  populateForm() {

    this.emailsForm.clear();
    this.phonesForm.clear();
    this.form.reset();

    this.form.patchValue({ name: this.suggestions[0] ?? "" })

    this.result.emails.forEach(
      email => {
        this.emailsForm.push(
          this.formBuilder.control(email)
        )
      }
    );

    this.result.phones.forEach(
      phone => {
        this.phonesForm.push(
          this.formBuilder.control(phone)
        )
      }
    );

  }

  addControl(formName: "emails" | "phones") {

    const form = <FormArray>this.form.get(formName)!;

    form.push(this.formBuilder.control(null));

  }

  removeControl(formName: "emails" | "phones", index: number) {

    const form = <FormArray>this.form.get(formName)!;

    form.removeAt(index);

  }

  populateSuggestions() {

    if (this.result.nameSuggestions.first50.length) {

      this.suggestions = [...this.result.nameSuggestions.first50];

      // if there are more suggestions than in first 50
      let moreSuggestions = this.result.nameSuggestions.all.filter(
        suggestion => this.result.nameSuggestions.first50.indexOf(suggestion) == -1
      )

      this.isShowMoreVissible = !!moreSuggestions.length;

    } else

      this.suggestions = [...this.result.nameSuggestions.all];

  }

  showAllSuggestions() {

    this.suggestions = [
      ...this.result.nameSuggestions.first50,
      ...this.result.nameSuggestions.all
    ]

    // remove duplicates
    this.suggestions = this.suggestions.filter((item, index, self) => {
      return self.indexOf(item) == index
    })

  }

  onSuggestionSelect(suggestion: string) {

    this.form.patchValue({ name: suggestion });

  }


  createCard() {

    this.formSubmitted = true;

    if (this.form.invalid)
      return;

    this.vcardService.generateVCard(this.form.value)

  }


}

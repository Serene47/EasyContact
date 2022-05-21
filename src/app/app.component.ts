import { Component } from '@angular/core';
import { AppState } from './core/model/app.value';
import { GeneralService } from './core/service/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  AppState = AppState;

  constructor(
    public generalService: GeneralService
  ) { }



}

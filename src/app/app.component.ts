import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppState } from './core/model/app.value';
import { GeneralService } from './core/service/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  AppState = AppState;

  constructor(
    public generalService: GeneralService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    this.initIcons();

  }

  initIcons() {

    this.matIconRegistry.
      addSvgIcon("index_left", this.domSanitizer.
        bypassSecurityTrustResourceUrl("assets/images/index-left.svg"));


    this.matIconRegistry.
      addSvgIcon("index_down", this.domSanitizer.
        bypassSecurityTrustResourceUrl("assets/images/index-down.svg"))

  }

}

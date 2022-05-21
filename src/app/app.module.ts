import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraContentComponent } from './camera-content/camera-content.component';
import { CardContentComponent } from './card-content/card-content.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraContentComponent,
    CardContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

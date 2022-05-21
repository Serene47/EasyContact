import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, fromEvent, Subject } from "rxjs";
import { AppState } from "../model/app.value";
import { WINDOW } from "../tokens/browser";

@Injectable({
  providedIn: "root"
})
export class GeneralService {

  state$ = new BehaviorSubject<AppState>(AppState.STREAM);

  capturedImage$ = new Subject<string>();

  constructor(
    @Inject(WINDOW) private window: Window
  ) { }

  windowResize$ = fromEvent(this.window, "resize")

}
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, fromEvent, Subject } from "rxjs";
import { ParsedResult } from "../model/app.types";
import { AppState } from "../model/app.value";
import { WINDOW } from "../tokens/browser";

@Injectable({
  providedIn: "root"
})
export class GeneralService {

  state$ = new BehaviorSubject<AppState>(AppState.STREAM);

  capturedImage$ = new Subject<string>();

  result$ = new Subject<ParsedResult>();

  constructor(
    @Inject(WINDOW) private window: Window
  ) { }

  windowResize$ = fromEvent(this.window, "resize")

}
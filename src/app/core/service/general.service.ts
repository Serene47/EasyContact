import { Inject, Injectable } from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { WINDOW } from "../tokens/browser";

@Injectable({
  providedIn: "root"
})
export class GeneralService {

  capturedImage$ = new Subject<string>();

  constructor(
    @Inject(WINDOW) private window: Window
  ) { }

  windowResize$ = fromEvent(this.window, "resize")

}
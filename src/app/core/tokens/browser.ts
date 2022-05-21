import { DOCUMENT } from "@angular/common";
import { inject, InjectionToken } from "@angular/core";

export const WINDOW = new InjectionToken(
  "Global window object",
  {
    factory: () => inject(DOCUMENT).defaultView
  }
)

export const NAVIGATOR = new InjectionToken(
  "Global window object",
  {
    factory: () => inject(WINDOW)?.navigator
  }
)
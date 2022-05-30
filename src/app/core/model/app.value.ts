
export enum AppState {
  STREAM = "stream",
  PROCESSING = "processing",
  RESULT = "result"
}

export const PHONE_REGEX = /\+?\s*(\d[\s-]*){9,15}/g;

export const EMAIL_REGEX = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/g;

export const CAPITAL_CASE_NAME_REGEX = /(?:[A-Z]{1,15} +){1,2}[A-Z]{1,15}/;

export const TITLE_CASE_NAME_REGEX = /(?:[A-Z][a-z]{1,15} +){1,2}[A-Z][a-z]{1,15}/;

export const LETTER_ONLY_NAME_REGEX = /(?:[A-Za-z]{1,15} +){1,2}[A-Za-z]{1,15}/;

export const GENERIC_NAME_REGEX = /(?:\w{1,15} +){1,2}\w{1,15}/;
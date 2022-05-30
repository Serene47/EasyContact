
export interface ParsedResult {

  nameSuggestions: {
    first50: string[];
    all: string[];
  };
  emails: string[];
  phones: string[];

}

export interface ContactDetails {

  name: string;

  phones: string[];
  emails: string[];

}
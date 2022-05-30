
export interface ParsedResult {

  nameSuggestions: {
    first50: string[];
    all: string[];
  };
  emails: string[];
  phones: string[];

}
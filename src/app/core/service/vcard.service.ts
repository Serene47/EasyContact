import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import VCard from "vcard-creator";
import { ContactDetails } from "../model/app.types";

@Injectable({
  providedIn: "root"
})
export class VcardService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  generateVCard(contactDetails: ContactDetails) {

    const card = new VCard();

    const nameParts = contactDetails.name.split(" ");

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const additional = nameParts.slice(1, nameParts.length - 1).join("");


    card.addName(firstName, lastName, additional);

    contactDetails.phones.forEach(
      phone => { card.addPhoneNumber(phone) }
    )

    contactDetails.emails.forEach(
      email => { card.addEmail(email) }
    )

    this.downloadVCard(card.toString());


  }

  downloadVCard(data: string) {

    const anchor = this.document.createElement("a");
    anchor.download = "contact.vcf";
    anchor.style.display = "none";

    const contents = new Blob([data], { type: "text/vcard", endings: "native" });

    const url = URL.createObjectURL(contents);

    anchor.href = url;

    this.document.body.appendChild(anchor);

    anchor.click();

    URL.revokeObjectURL(url);

  }


}
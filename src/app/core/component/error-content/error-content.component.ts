import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-content',
  templateUrl: './error-content.component.html',
  styleUrls: ['./error-content.component.scss']
})
export class ErrorContentComponent implements OnInit {

  @Input() title!: string;
  @Input() description?: string;

  constructor() { }

  ngOnInit(): void {
  }

}

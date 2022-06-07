import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitContentComponent } from './init-content.component';

describe('InitContentComponent', () => {
  let component: InitContentComponent;
  let fixture: ComponentFixture<InitContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

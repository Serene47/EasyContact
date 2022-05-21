import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraContentComponent } from './camera-content.component';

describe('CameraContentComponent', () => {
  let component: CameraContentComponent;
  let fixture: ComponentFixture<CameraContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

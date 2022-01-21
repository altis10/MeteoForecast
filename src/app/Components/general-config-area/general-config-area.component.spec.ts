import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConfigAreaComponent } from './general-config-area.component';

describe('GeneralConfigAreaComponent', () => {
  let component: GeneralConfigAreaComponent;
  let fixture: ComponentFixture<GeneralConfigAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralConfigAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConfigAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

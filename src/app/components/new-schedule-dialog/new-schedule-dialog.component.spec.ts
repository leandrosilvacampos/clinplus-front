import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScheduleDialogComponent } from './new-schedule-dialog.component';

describe('NewScheduleDialogComponent', () => {
  let component: NewScheduleDialogComponent;
  let fixture: ComponentFixture<NewScheduleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewScheduleDialogComponent]
    });
    fixture = TestBed.createComponent(NewScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

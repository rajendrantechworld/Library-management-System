import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExcelDetailsComponent } from './upload-excel-details.component';

describe('UploadExcelDetailsComponent', () => {
  let component: UploadExcelDetailsComponent;
  let fixture: ComponentFixture<UploadExcelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadExcelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExcelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

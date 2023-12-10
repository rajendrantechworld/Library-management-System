import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerForEditorComponent } from './image-viewer-for-editor.component';

describe('ImageViewerForEditorComponent', () => {
  let component: ImageViewerForEditorComponent;
  let fixture: ComponentFixture<ImageViewerForEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerForEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerForEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEditorComponent } from './manual-editor.component';

describe('ManualEditorComponent', () => {
  let component: ManualEditorComponent;
  let fixture: ComponentFixture<ManualEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

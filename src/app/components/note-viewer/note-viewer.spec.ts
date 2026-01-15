import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteViewer } from './note-viewer';

describe('NoteViewer', () => {
  let component: NoteViewer;
  let fixture: ComponentFixture<NoteViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

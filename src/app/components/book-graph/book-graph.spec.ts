import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookGraph } from './book-graph';

describe('BookGraph', () => {
  let component: BookGraph;
  let fixture: ComponentFixture<BookGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

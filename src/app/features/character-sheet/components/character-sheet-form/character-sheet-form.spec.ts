import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetForm } from './character-sheet-form';

describe('CharacterSheetForm', () => {
  let component: CharacterSheetForm;
  let fixture: ComponentFixture<CharacterSheetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSheetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSheetForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveABookComponent } from './have-a-book.component';

describe('HaveABookComponent', () => {
  let component: HaveABookComponent;
  let fixture: ComponentFixture<HaveABookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HaveABookComponent]
    });
    fixture = TestBed.createComponent(HaveABookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

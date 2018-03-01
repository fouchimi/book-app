import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshelveComponent } from './bookshelve.component';

describe('BookshelveComponent', () => {
  let component: BookshelveComponent;
  let fixture: ComponentFixture<BookshelveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookshelveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookshelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

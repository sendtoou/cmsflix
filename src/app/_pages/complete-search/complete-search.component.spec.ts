import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSearchComponent } from './complete-search.component';

describe('CompleteSearchComponent', () => {
  let component: CompleteSearchComponent;
  let fixture: ComponentFixture<CompleteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

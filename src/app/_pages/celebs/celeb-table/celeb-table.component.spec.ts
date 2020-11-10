import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebTableComponent } from './celeb-table.component';

describe('CelebTableComponent', () => {
  let component: CelebTableComponent;
  let fixture: ComponentFixture<CelebTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

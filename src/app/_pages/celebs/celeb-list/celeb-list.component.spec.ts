import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebListComponent } from './celeb-list.component';

describe('CelebListComponent', () => {
  let component: CelebListComponent;
  let fixture: ComponentFixture<CelebListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

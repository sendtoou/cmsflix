import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebLangComponent } from './celeb-lang.component';

describe('CelebLangComponent', () => {
  let component: CelebLangComponent;
  let fixture: ComponentFixture<CelebLangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebLangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

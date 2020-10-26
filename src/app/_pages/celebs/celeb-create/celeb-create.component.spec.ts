import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebCreateComponent } from './celeb-create.component';

describe('CelebCreateComponent', () => {
  let component: CelebCreateComponent;
  let fixture: ComponentFixture<CelebCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

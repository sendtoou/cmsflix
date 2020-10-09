import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieInfoComponent } from './serie-info.component';

describe('SerieInfoComponent', () => {
  let component: SerieInfoComponent;
  let fixture: ComponentFixture<SerieInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

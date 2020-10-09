import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspisodeComponent } from './espisode.component';

describe('EspisodeComponent', () => {
  let component: EspisodeComponent;
  let fixture: ComponentFixture<EspisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

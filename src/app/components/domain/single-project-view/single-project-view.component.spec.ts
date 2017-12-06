import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProjectViewComponent } from './single-project-view.component';

describe('SingleProjectViewComponent', () => {
  let component: SingleProjectViewComponent;
  let fixture: ComponentFixture<SingleProjectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProjectViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

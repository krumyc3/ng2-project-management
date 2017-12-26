import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectModalComponent } from './new-project-modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CssSelector } from '@angular/compiler';
import { MessageComponent } from '../../message/message.component';
import { FormsModule } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { INITIAL_STATE } from '../../../../store/initialState';
import { ModalsActions } from '../../../../store/actions/modals.actions';
import { ClientsService } from '../../../../clients.service';
import { ClientActions } from '../../../../store/actions/client.actions';
import { ProjectService } from '../../../../services/project.service';
import { UserService } from '../../../../services/user.service';
import { Apollo } from 'apollo-angular/Apollo';
import { NotificationsService } from 'angular2-notifications';
import { ProjectActions } from '../../../../store/actions/project.actions';
import { UserActions } from '../../../../store/actions/user.actions';
import { Router } from '@angular/router';

describe('NewProjectModalComponent', () => {
  let component: NewProjectModalComponent;
  let fixture: ComponentFixture<NewProjectModalComponent>;
  let element: HTMLElement;
  let debug: DebugElement;
  const clientServiceStub = {};
  const cssSelector = '.new-project-modal';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ NewProjectModalComponent, MessageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectModalComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement.query(By.css(cssSelector));
    const clientService = fixture.debugElement.injector.get(UserService);
    element = debug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action to store', () => {
    let inputName: HTMLInputElement;
    let inputDescription: HTMLInputElement;

    const expectedName = 'Test name';
    const expectedDescription = 'Test description';

    inputName = fixture.debugElement.query(By.css('#project-name')).nativeElement;
    inputDescription = fixture.debugElement.query(By.css('#project-description')).nativeElement;

    inputName.value = expectedName;
    inputDescription.value = expectedDescription;

    expect(component.project.name).toEqual(expectedName);
    expect(component.project.description).toEqual(expectedDescription);
  });
});

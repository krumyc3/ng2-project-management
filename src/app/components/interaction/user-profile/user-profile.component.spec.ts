import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { User } from '../../../models/user';
import { UserRole } from '../../../enums/user-role.enum';
import { by } from 'protractor';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { getCiphers } from 'crypto';
import { UserService } from '../../../services/user.service';


fdescribe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService;
  beforeEach(async(() => {
    const userServiceStub = {
      updateUserInfo: (userInfo) => userInfo
    };
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ UserProfileComponent ],
      providers: [ {
        provide: UserService,
        useValue: userServiceStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getByCss (cssClass: string): DebugElement {
    return fixture.debugElement.query(By.css(cssClass));
  }
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have edit mode toggled on', () => {
    expect(component.isEditing).toBe(false);
  });

  it('should correctly toggle edit status after clicking icon', fakeAsync(() => {
    const startEditMode = component.isEditing;
    const iconElement = fixture.debugElement.query(By.css('#editIcon'));
    iconElement.triggerEventHandler('click', null);
    tick();
    expect(component.isEditing).toBe(true);
  }));

  it('should not have visible inputs', () => {
    const firstNameInput = fixture.debugElement.query(By.css('[name="first-name"]'));
    expect(firstNameInput).toBe(null);
  });

  it('should show inputs after clicking editIcon', () => {
    const startEditMode = component.isEditing;
    const iconElement = fixture.debugElement.query(By.css('#editIcon'));
    iconElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    const lastNameInput = fixture.debugElement.query(By.css('[name="last-name"]'));
    expect(lastNameInput).toBeTruthy();
  });

  it('should correctly update user model', () => {
    const mockUserInfo = {
      firstName: 'some first name',
      lastName: 'some last name',
      phone: '44'
    };
    component.isEditing = true;
    fixture.detectChanges();
    const firstName: HTMLInputElement = fixture.debugElement.query(By.css('[name="first-name"]')).nativeElement;
    const lastName: HTMLInputElement = fixture.debugElement.query(By.css('[name="last-name"]')).nativeElement;
    const phone: HTMLInputElement = fixture.debugElement.query(By.css('[name="phone"]')).nativeElement;
    firstName.value = mockUserInfo.firstName;
    lastName.value = mockUserInfo.lastName;
    phone.value = mockUserInfo.phone;
    fixture.detectChanges();
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    phone.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.user.firstName).toBe(mockUserInfo.firstName);
    expect(component.user.lastName).toBe(mockUserInfo.lastName);
    expect(component.user.phone).toBeTruthy(mockUserInfo.phone);
  });

  it('should correctly display existing user model', () => {
    component.user = new User('', 'email@example.com', 'Test user', 'Test user last name', UserRole.QA, '234');
    fixture.detectChanges();
    const firstNamePara: HTMLParagraphElement = fixture.debugElement.query(By.css('.user-profile__first-name')).nativeElement;
    const lastNamePara: HTMLParagraphElement = fixture.debugElement.query(By.css('.user-profile__last-name')).nativeElement;
    const phonePara: HTMLParagraphElement = fixture.debugElement.query(By.css('.user-profile__phone')).nativeElement;
    expect(firstNamePara.textContent).toBe(component.user.firstName);
    expect(lastNamePara.textContent).toBe(component.user.lastName);
    expect(phonePara.textContent).toBe(component.user.phone);
  });

  it('should correctly cancel edit mode', () => {
    component.isEditing = true;
    fixture.detectChanges();
    const cancelButton: HTMLButtonElement = getByCss('.cancel-edit').nativeElement;
    cancelButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.isEditing).toBe(false);
  });
});


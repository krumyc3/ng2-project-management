import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { SpinnerService } from '../../../services/spinner.service';
import { Subscription } from 'rxjs/Subscription';

enum UserFormMode {
  LOGIN = 'login',
  REGISTER = 'register',
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  private user: User = new User('', '', '', '');
  private userPassword: string;
  private isLoggingIn: boolean;
  private mode: UserFormMode = UserFormMode.LOGIN;
  private spinnerSubscription: Subscription;
  constructor(
    private spinnerService: SpinnerService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.spinnerSubscription = this.spinnerService.isActive().subscribe((isActive: boolean) => {
      this.isLoggingIn = isActive;
    });
  }

  changeUserFormMode(newMode: UserFormMode) {
    this.mode = newMode;
  }
  // TODO: change this temporary validation to form-based one
  isUserModelValid() {
    return this.user.email.length > 0 && this.userPassword.length > 0;
  }
  login() {
    if (this.isUserModelValid()) {
      this.userService.loginUser(this.user.email, this.userPassword);
    }
  }
  register() {
    if (this.isUserModelValid()) {
      console.log(`email ${this.user.email} pass ${this.userPassword}`);
      this.userService.registerUser(this.user, this.userPassword);
    }
  }

}

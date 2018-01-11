import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

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
  private userEmail: string;
  private userPassword: string;
  private isLoggingIn: boolean;
  private mode: UserFormMode = UserFormMode.LOGIN;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isLoggingIn = false;
  }

  changeUserFormMode(newMode: UserFormMode) {
    this.mode = newMode;
  }
  // TODO: change this temporary validation to form-based one
  isUserModelValid() {
    return this.userEmail.length > 0 && this.userPassword.length > 0;
  }
  login() {
    if (this.isUserModelValid()) {
      this.userService.loginUser(this.userEmail, this.userPassword);
    }
  }
  register() {
    if (this.isUserModelValid()) {
      this.userService.registerUser({
        email: this.userEmail,
        password: this.userPassword
      });
    }
  }

}

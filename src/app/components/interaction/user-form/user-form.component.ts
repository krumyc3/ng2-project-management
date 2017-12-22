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
  private mode: UserFormMode = UserFormMode.LOGIN;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  changeUserFormMode(newMode: UserFormMode) {
    this.mode = newMode;
  }
  login() {
    this.userService.loginUser(this.userEmail, this.userPassword);
  }
  register() {
    this.userService.registerUser({email: this.userEmail, password: this.userPassword});
  }

}

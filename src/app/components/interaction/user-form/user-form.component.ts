import { Component, OnInit } from '@angular/core';

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
  private mode: UserFormMode = UserFormMode.LOGIN;
  constructor() { }

  ngOnInit() {

  }

  changeUserFormMode(newMode: UserFormMode) {
    this.mode = newMode;
  }
  login() {}
  register() {}

}

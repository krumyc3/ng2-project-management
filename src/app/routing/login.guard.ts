import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from '../backend/node_modules/apollo-link';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): Promise<boolean> {
    return this.userService.isLoggedIn().then((status: boolean) => {
      if (status) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    });
  }
}

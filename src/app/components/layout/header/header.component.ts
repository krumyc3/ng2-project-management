import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../store/initialState';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { NOTIFICATION_OPTIONS } from '../../../utils/GLOBAL_CONFIG';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: any = { email: '' };
  userIsLoggedIn: boolean;
  userSubscription: Subscription;
  notificationOptions = NOTIFICATION_OPTIONS;
  constructor(private userService: UserService, private store: NgRedux<InitialAppState>) {
    this.setUpUserSubscription();
  }

  logoutUser(): void {
    this.userService.logoutUser();
  }

  setUpUserSubscription() {
    this.userSubscription = this.store.select('userState').subscribe((user: any) => {
      if (user.id) {
        this.userIsLoggedIn = true;
      } else this.userIsLoggedIn = false;
      this.loggedInUser = user;
    });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {
    this.userService.isLoggedIn();
  }

}

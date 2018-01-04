import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../store/initialState';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isEditing: boolean;
  user: User = new User('', '', '', '', null, '');
  userSubscription: Subscription;
  constructor(private store: NgRedux<InitialAppState>, private userService: UserService) {
    this.isEditing = false;
  }

  ngOnInit() {
    this.userService.getUserDetails(this.store.getState().userState.id);
    this.setUpUserSubscription();
  }
  setUpUserSubscription() {
    this.userSubscription = this.store.select<User>('userState').subscribe((userData: User) => {
      this.user = userData;
    });
  }
  updateUserProfile() {
    this.userService.updateUserInfo(this.user);
    this.cancelEditMode();
  }
  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }
  cancelEditMode() {
    this.isEditing = false;
  }
}

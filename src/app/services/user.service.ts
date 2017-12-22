import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import { NotificationsService } from 'angular2-notifications';
import { Apollo } from 'apollo-angular/Apollo';
import { User } from '../models/user';
import { MRegisterUser, MLoginUser } from '../backend/graph.mutations';
import { UserActions } from '../store/actions/user.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(
    private store: NgRedux<InitialAppState>,
    private notifications: NotificationsService,
    private apollo: Apollo,
    private userActions: UserActions,
    private router: Router,
  ) { }

  loginUser(userEmail: string, userPassword: string) {
    try {
      this.apollo.mutate({
        mutation: MLoginUser,
        variables: {
          email: userEmail,
          password: userPassword,
        }
      }).subscribe(({data}) => {
        const response = data.authenticateUser;
        localStorage.setItem('graphcoolToken', response.token);
        this.store.dispatch(this.userActions.signInUser(response.id, userEmail, response.token));
        this.router.navigateByUrl('/projects').then(() => {
          this.notifications.success('Welcome', `Welcome back ${userEmail}`);
        });
      });
    } catch (error) {
      console.log('error!');
      console.log(error);
    }
  }

  registerUser(user) {
    this.apollo.mutate({
      mutation: MRegisterUser,
      variables: {
        email: user.email,
        password: user.password
      }
    }).subscribe(({data}) => {
      const userToken: string = data.signupUser.token;
      localStorage.setItem('graphcoolToken', userToken);
      this.notifications.success('Signed up', 'User signed up');
      this.store.dispatch(this.userActions.signUpUser(data.signupUser.id, '', userToken));
    });
  }
  public logoutUser(): void {
    localStorage.removeItem('graphcoolToken');
    this.notifications.info('Loggedd out', 'User logged out');
    this.router.navigateByUrl('/login');
  }
  public isLoggedIn(): boolean {
    const userToken = localStorage.getItem('graphcoolToken');
    console.log('userToken');
    console.log(userToken);
    if (userToken === null) {
      return false;
    }
    return userToken.length > 0;
  }
}


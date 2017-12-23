import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import { NotificationsService } from 'angular2-notifications';
import { Apollo } from 'apollo-angular/Apollo';
import { User } from '../models/user';
import { MRegisterUser, MLoginUser } from '../backend/graph.mutations';
import { UserActions } from '../store/actions/user.actions';
import { Router } from '@angular/router';
import { QLoggedInUser } from '../backend/graph.queries';

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
    this.store.dispatch(this.userActions.clearUser());
    this.router.navigateByUrl('/login');
  }
  public isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apollo.query({
        query: QLoggedInUser,
        fetchPolicy: 'network-only',
      }).subscribe(({data}: any) => {
        const isUserLoggedIn = data.loggedInUser !== null && data.loggedInUser.id !== '';
        if (isUserLoggedIn) {
          this.store.dispatch(this.userActions.signInUser(data.loggedInUser.id, data.loggedInUser.email, ''));
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}


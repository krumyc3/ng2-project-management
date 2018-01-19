import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import { NotificationsService } from 'angular2-notifications';
import { Apollo } from 'apollo-angular/Apollo';
import { User } from '../models/user';
import { MRegisterUser, MLoginUser, MUpdateUserInfo } from '../backend/graph.mutations';
import { UserActions } from '../store/actions/user.actions';
import { Router } from '@angular/router';
import { QLoggedInUser, QUserInfo } from '../backend/graph.queries';
import { GLOBAL_CONFIG } from '../utils/GLOBAL_CONFIG';
import { ProjectAction, ProjectActions } from '../store/actions/project.actions';
import { TaskActions } from '../store/actions/task.actions';
import { CommentActions } from '../store/actions/comment.actions';
import { ClientActions } from '../store/actions/client.actions';
import { UtilsService } from './base-service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class UserService {

  constructor(
    private apollo: Apollo,
    public utils: UtilsService,
    private userActions: UserActions,
    private projectActions: ProjectActions,
    private router: Router,
  ) {
  }

  loginUser(userEmail: string, userPassword: string) {
    this.utils.spinnerService.setActive();
      this.apollo.mutate({
        mutation: MLoginUser,
        variables: {
          email: userEmail,
          password: userPassword,
        }
      }).subscribe(({data}) => {
        const response = data.authenticateUser;
        console.log('login user data');
        console.log(response);
        localStorage.setItem(GLOBAL_CONFIG.GRAPHCOOL_USER_ID, response.id);
        localStorage.setItem(GLOBAL_CONFIG.GRAPHCOOL_TOKEN, response.token);
        this.router.navigateByUrl('/projects').then(() => {
          this.utils.notifications.success('Welcome', `Welcome back ${userEmail}`);
        });
        this.utils.spinnerService.setNotActive();
      }, this.utils.handleError.bind(this));
  }
  registerUser(user: User, userPassword: string) {
    this.apollo.mutate({
      mutation: MRegisterUser,
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: userPassword
      }
    }).subscribe(({data}) => {
      const userToken: string = data.signupUser.token;
      localStorage.setItem(GLOBAL_CONFIG.GRAPHCOOL_USER_ID, data.signupUser.id);
      localStorage.setItem(GLOBAL_CONFIG.GRAPHCOOL_TOKEN, userToken);
      this.utils.notifications.success('Signed up', 'User signed up');
      this.utils.store.dispatch(this.userActions.signUpUser(data.signupUser.id, '', userToken));
    }, this.utils.handleError.bind(this));
  }
  public logoutUser(): void {
    localStorage.removeItem(GLOBAL_CONFIG.GRAPHCOOL_TOKEN);
    localStorage.removeItem(GLOBAL_CONFIG.GRAPHCOOL_USER_ID);
    this.utils.notifications.info('Loggedd out', 'User logged out');
    this.clearStore();
    this.router.navigateByUrl('/login');
  }

  public clearStore() {
    // temporary solution to clearing
    this.utils.store.dispatch(this.userActions.clearUser());
    this.utils.store.dispatch(this.projectActions.clearProjects());
  }
  public isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // temporary fix for long route navigation
      if (localStorage.getItem(GLOBAL_CONFIG.GRAPHCOOL_USER_ID)) {
        resolve(true);
      }
        this.apollo.query({
          query: QLoggedInUser,
          fetchPolicy: 'network-only',
        }).subscribe(({data}: any) => {
          console.log(data);
          const isUserLoggedIn = data.loggedInUser !== null && data.loggedInUser.id !== '';
          if (isUserLoggedIn) {
            if (this.utils.store.getState().userState.id === data.loggedInUser.id) {
              resolve(true);
            } else {
              this.utils.store.dispatch(this.userActions.signInUser(data.loggedInUser.id, data.loggedInUser.email, ''));
              resolve(true);
            }
          } else {
            resolve(false);
          }
        });
      });
  }

  public updateUserInfo(user: User) {
    this.apollo.mutate({
      mutation: MUpdateUserInfo,
      variables: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      }
    }).subscribe(({data}) => {
      this.utils.notifications.success('Success', 'User profile updated');
    }, this.utils.handleError.bind(this));
  }

  public getUserDetails(userId: string) {
    this.apollo.query({
      query: QUserInfo,
      variables: {
        userId
      }
    }).subscribe(({data}: any) => {
      const userInfo = data.User;
      this.utils.store.dispatch(this.userActions.updateUserInfo(userInfo));
    }, this.utils.handleError.bind(this));
  }
}


import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';
import { InitialAppState } from '../store/initialState';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class BaseService {
  constructor(
    protected notifications: NotificationsService,
    protected store: NgRedux<InitialAppState>,
  ) {}
  handleError = (error) => {
    this.notifications.error('Error', error.message);
    console.log(error);
  }
  getLoggedInUserId(): string {
    return this.store.getState().userState.id;
  }
}

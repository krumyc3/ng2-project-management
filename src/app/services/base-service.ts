import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';
import { InitialAppState } from '../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { GLOBAL_CONFIG } from '../utils/GLOBAL_CONFIG';

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
    return localStorage.getItem(GLOBAL_CONFIG.GRAPHCOOL_USER_ID);
  }
}

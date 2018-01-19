import { NotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';
import { InitialAppState } from '../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { GLOBAL_CONFIG } from '../utils/GLOBAL_CONFIG';
import { SpinnerService } from './spinner.service';

@Injectable()
export class UtilsService {
  constructor(
    public notifications: NotificationsService,
    public store: NgRedux<InitialAppState>,
    public spinnerService: SpinnerService,
  ) {}
  handleError = (error) => {
    this.spinnerService.setNotActive();
    this.notifications.error('Error', error.message);
    console.log(error);
  }
  getLoggedInUserId(): string {
    return localStorage.getItem(GLOBAL_CONFIG.GRAPHCOOL_USER_ID);
  }
}

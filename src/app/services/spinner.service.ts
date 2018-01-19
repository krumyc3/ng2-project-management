import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../store/initialState';
import { Observable } from 'rxjs/Observable';
import { SpinnerAction, SpinnerActions } from '../store/actions/spinner.actions';

@Injectable()
export class SpinnerService {

  constructor(
    private store: NgRedux<InitialAppState>,
    private spinnerActions: SpinnerActions,
  ) {
   }
   setActive() {
     this.store.dispatch(this.spinnerActions.setActive());
   }

   setNotActive() {
     this.store.dispatch(this.spinnerActions.setNotActive());
   }
   isActive(): Observable<Boolean> {
     return this.store.select('spinner');
   }
}

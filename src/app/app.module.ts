import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DomainModule } from './modules/domain.module';
import { LayoutModule } from './modules/layout.module';
import { NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { NgReduxModule } from '@angular-redux/store';
import { InitialAppState, INITIAL_STATE } from './store/initialState';
import { createStore, Store, applyMiddleware, combineReducers } from 'redux';
import { modalsReducer } from './store/reducers/modals.reducer';
import { projectReducer } from './store/reducers/project.reducer';
import { RouterModule } from '@angular/router';
import appRoutes from './routing/routes';

export const store: Store<any> = createStore(combineReducers(
  {
    projectsList: projectReducer,
    modalsState: modalsReducer,
  }
), INITIAL_STATE, applyMiddleware(createLogger()));

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true
      }
    ),
    BrowserModule,
    DomainModule,
    LayoutModule,
    NgReduxModule,
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(ngRedux: NgRedux<InitialAppState>) {
    ngRedux.provideStore(store);
  }
}

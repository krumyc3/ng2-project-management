import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DomainModule } from './modules/domain.module';
import { LayoutModule } from './modules/layout.module';
import { NgRedux } from '@angular-redux/store';
import { NgReduxModule } from '@angular-redux/store';
import { InitialAppState, INITIAL_STATE } from './store/initialState';
import { modalsReducer } from './store/reducers/modals.reducer';
import { projectReducer } from './store/reducers/project.reducer';
import { RouterModule } from '@angular/router';
import appRoutes from './routing/routes';
import { taskReducer } from './store/reducers/task.reducer';
import { commentReducer } from './store/reducers/comment.reducer';
import { createStore, Store, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';


export const appStore: Store<any> = createStore(combineReducers(
  {
    projectsList: projectReducer,
    tasksList: taskReducer,
    commentsList: commentReducer,
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
        enableTracing: false
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
    ngRedux.provideStore(appStore);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { client } from './backend/graphcool.client';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { AppComponent } from './app.component';
import { DomainModule } from './modules/domain.module';
import { LayoutModule } from './modules/layout.module';
import { NgRedux } from '@angular-redux/store';
import { NgReduxModule } from '@angular-redux/store';
import { InitialAppState, INITIAL_STATE } from './store/initialState';
import { modalsReducer } from './store/reducers/modals.reducer';
import { projectReducer } from './store/reducers/project.reducer';
import { RouterModule } from '@angular/router';
import {appRoutes} from './routing/routes';
import { HttpClientModule } from '@angular/common/http';
import { taskReducer } from './store/reducers/task.reducer';
import { commentReducer } from './store/reducers/comment.reducer';
import { createStore, Store, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { editingReducer } from './store/reducers/editing.reducer';
import { Apollo } from 'apollo-angular';
import ApolloClient from 'apollo-client';
import { ApolloClientOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-angular-link-http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const appStore: Store<any> = createStore(combineReducers(
  {
    projectsList: projectReducer,
    tasksList: taskReducer,
    commentsList: commentReducer,
    modalsState: modalsReducer,
    editingResource: editingReducer
  }
), INITIAL_STATE, applyMiddleware(createLogger()));

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [HttpLink],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false
      }
    ),
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    DomainModule,
    LayoutModule,
    NgReduxModule,
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(ngRedux: NgRedux<InitialAppState>, apolloModule: Apollo, httpLink: HttpLink) {
    ngRedux.provideStore(appStore);
    apolloModule.create({
      link: httpLink.create({ uri: 'https://api.graph.cool/simple/v1/cjb2hxa2p1edf0195t7wi8zwo'}),
      cache: new InMemoryCache()
    });
  }
}

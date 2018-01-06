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
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientsService } from './clients.service';
import { clientReducer } from './store/reducers/client.reducer';
import { ClientActions } from './store/actions/client.actions';
import { UserService } from './services/user.service';
import { userReducer } from './store/reducers/user.reducer';
import { UserActions } from './store/actions/user.actions';
import { LoginGuard } from './routing/login.guard';
import { ApolloLink } from 'apollo-link';
import { InteractionModule } from './modules/interaction.module';


const clearStore = (state, action) => {
  if (action === 'CLEAR_STORE') {
    return undefined;
  }
  return state;
};
const appReducer: Store<InitialAppState> = createStore(combineReducers(
  {
    projectsList: projectReducer,
    tasksList: taskReducer,
    commentsList: commentReducer,
    modalsState: modalsReducer,
    userState: userReducer,
    editingResource: editingReducer,
    clientsList: clientReducer,
  }
), INITIAL_STATE, applyMiddleware(createLogger()));

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
  });
  return forward(operation);
});
@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [HttpLink, ClientsService, ClientActions, NotificationsService, UserService, UserActions, LoginGuard],
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
    InteractionModule,
    LayoutModule,
    NgReduxModule,
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(ngRedux: NgRedux<InitialAppState>, apolloModule: Apollo, httpLink: HttpLink) {
    ngRedux.provideStore(appReducer);
    apolloModule.create({
      link: middlewareLink.concat(httpLink.create({ uri: 'https://api.graph.cool/simple/v1/cjb2hxa2p1edf0195t7wi8zwo'})),
      cache: new InMemoryCache()
    });
  }
}

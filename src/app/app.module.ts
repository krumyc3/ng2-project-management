import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DomainModule } from './modules/domain.module';
import { LayoutModule } from './modules/layout.module';
import { NgRedux } from '@angular-redux/store';
import { rootReducer } from './store/AppStore';
import { createLogger } from 'redux-logger';
import { NgReduxModule } from '@angular-redux/store';
import { InitialAppState, INITIAL_STATE } from './store/initialState';
import { createStore, Store, applyMiddleware } from 'redux';
import { $ } from 'protractor';
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DomainModule,
    LayoutModule,
    NgReduxModule,
  ],
  bootstrap: [AppComponent]
})

export const store: Store<any> = createStore(rootReducer, INITIAL_STATE, applyMiddleware(createLogger));

export class AppModule {
  constructor(ngRedux: NgRedux<InitialAppState>) {
    ngRedux.provideStore(store);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DomainModule } from './modules/domain.module';
import { LayoutModule } from './modules/layout.module';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState, rootReducer, INITIAL_STATE } from './store/AppStore';
import { createLogger } from 'redux-logger';
import { NgReduxModule } from '@angular-redux/store';


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
export class AppModule {
  constructor(ngRedux: NgRedux<InitialAppState>) {
    ngRedux.configureStore(
      rootReducer, INITIAL_STATE, [ createLogger()]
    );
  }
}

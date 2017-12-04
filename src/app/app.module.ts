import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Backend } from './backend/backend';
import { DomainModule } from './modules/domain.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DomainModule
  ],
  providers: [Backend],
  bootstrap: [AppComponent]
})
export class AppModule { }

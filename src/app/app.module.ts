import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Backend } from './backend/backend';
import { DomainModule } from './modules/domain.module';
import { LayoutModule } from './modules/layout.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DomainModule,
    LayoutModule,
  ],
  providers: [Backend],
  bootstrap: [AppComponent]
})
export class AppModule { }

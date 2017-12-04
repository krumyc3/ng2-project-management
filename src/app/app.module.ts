import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Backend } from './backend/backend';
import { ProjectsListComponent } from './projects-list/projects-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Backend],
  bootstrap: [AppComponent]
})
export class AppModule { }

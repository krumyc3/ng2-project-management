import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/layout/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { InteractionModule } from './interaction.module';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    InteractionModule,
    RouterModule,
    SimpleNotificationsModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class LayoutModule { }

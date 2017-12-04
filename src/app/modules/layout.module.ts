import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/layout/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { InteractionModule } from './interaction.module';

@NgModule({
  imports: [
    CommonModule,
    InteractionModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class LayoutModule { }

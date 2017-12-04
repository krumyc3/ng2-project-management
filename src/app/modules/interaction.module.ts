import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProjectModalComponent } from '../components/interaction/modals/new-project-modal/new-project-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NewProjectModalComponent],
  exports: [NewProjectModalComponent]
})
export class InteractionModule { }

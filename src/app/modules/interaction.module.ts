import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewProjectModalComponent } from '../components/interaction/modals/new-project-modal/new-project-modal.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [NewProjectModalComponent],
  exports: [NewProjectModalComponent]
})
export class InteractionModule { }

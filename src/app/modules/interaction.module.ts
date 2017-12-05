import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewProjectModalComponent } from '../components/interaction/modals/new-project-modal/new-project-modal.component';
import { MessageComponent } from '../components/interaction/message/message.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [NewProjectModalComponent, MessageComponent],
  exports: [NewProjectModalComponent]
})
export class InteractionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewProjectModalComponent } from '../components/interaction/modals/new-project-modal/new-project-modal.component';
import { MessageComponent } from '../components/interaction/message/message.component';
import { ModalsActions } from '../store/actions/modals.actions';
import { NewTaskModalComponent } from '../components/interaction/modals/new-task-modal/new-task-modal.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  providers: [ModalsActions],
  declarations: [NewProjectModalComponent, MessageComponent, NewTaskModalComponent],
  exports: [NewProjectModalComponent, NewTaskModalComponent]
})
export class InteractionModule { }

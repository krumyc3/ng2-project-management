import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewProjectModalComponent } from '../components/interaction/modals/new-project-modal/new-project-modal.component';
import { MessageComponent } from '../components/interaction/message/message.component';
import { ModalsActions } from '../store/actions/modals.actions';
import { NewTaskModalComponent } from '../components/interaction/modals/new-task-modal/new-task-modal.component';
import { CommentFormComponent } from '../components/interactions/forms/comment-form/comment-form.component';
import { EditProjectModalComponent } from '../components/interaction/modals/edit-project-modal/edit-project-modal.component';
import { EditingActions } from '../store/actions/editing.actions';


@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  providers: [ModalsActions, EditingActions],
  declarations: [NewProjectModalComponent, MessageComponent, NewTaskModalComponent, CommentFormComponent, EditProjectModalComponent],
  exports: [
    NewProjectModalComponent,
    EditProjectModalComponent,
    NewTaskModalComponent,
    CommentFormComponent]
})
export class InteractionModule { }

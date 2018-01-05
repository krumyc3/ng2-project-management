import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../components/domain/project/project.component';
import { TaskComponent } from '../components/domain/task/task.component';
import { UserComponent } from '../components/domain/user/user.component';
import { CommentComponent } from '../components/domain/comment/comment.component';
import { ProjectlistComponent } from '../components/domain/projectlist/projectlist.component';
import { InteractionModule } from './interaction.module';
import { ProjectService } from '../services/project.service';
import { ProjectActions } from '../store/actions/project.actions';
import { SingleProjectViewComponent } from '../components/domain/single-project-view/single-project-view.component';
import { RouterModule } from '@angular/router';
import { TasklistComponent } from '../components/domain/tasklist/tasklist.component';
import { TasksService } from '../services/tasks.service';
import { CommentsListComponent } from '../components/domain/comments-list/comments-list.component';
import { TaskActions } from '../store/actions/task.actions';
import { CommentActions } from '../store/actions/comment.actions';
import { ModalsActions } from '../store/actions/modals.actions';
import { CommentsService } from '../comments.service';
import { ClientListComponent } from '../components/domain/client-list/client-list.component';
import { ProjectNameFilterPipe } from '../project-filter.pipe';
import { ProjectClientPipe } from '../project-client.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InteractionModule,
    RouterModule,
    FormsModule,
  ],
  providers: [ProjectService, ProjectActions, TasksService, TaskActions, CommentActions, CommentsService],
  declarations: [
    ProjectComponent,
    TaskComponent,
    UserComponent,
    CommentComponent,
    ProjectlistComponent,
    SingleProjectViewComponent,
    ProjectNameFilterPipe,
    TasklistComponent,
    CommentsListComponent,
    ClientListComponent,
    ProjectClientPipe],
  exports: [ProjectlistComponent, ClientListComponent]
})
export class DomainModule { }

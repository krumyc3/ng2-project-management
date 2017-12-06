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

@NgModule({
  imports: [
    CommonModule,
    InteractionModule,
    RouterModule
  ],
  providers: [ProjectService, ProjectActions],
  declarations: [ProjectComponent, TaskComponent, UserComponent, CommentComponent, ProjectlistComponent, SingleProjectViewComponent],
  exports: [ProjectlistComponent]
})
export class DomainModule { }

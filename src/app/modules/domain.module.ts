import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../components/domain/project/project.component';
import { TaskComponent } from '../components/domain/task/task.component';
import { UserComponent } from '../components/domain/user/user.component';
import { CommentComponent } from '../components/domain/comment/comment.component';
import { ProjectlistComponent } from '../components/domain/projectlist/projectlist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProjectComponent, TaskComponent, UserComponent, CommentComponent, ProjectlistComponent],
  exports: [ProjectlistComponent]
})
export class DomainModule { }

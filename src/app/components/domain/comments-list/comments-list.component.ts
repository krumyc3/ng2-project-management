import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../store/initialState';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscribable, Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit, OnDestroy {
  @Input() taskId: String;
  @Input() comments: any[];
  private commentsSubscription: any;
  constructor(
    private store: NgRedux<InitialAppState>
  ) {
  }
  ngOnInit() {
    this.subscribeToTaskComments();
  }
  subscribeToTaskComments(): void {
    this.commentsSubscription = this.store.select('commentsList').subscribe((commentsList: any[]) => {
      const taskComments = commentsList.filter(comment => comment.taskId.toString() === this.taskId.toString());
      console.log(`comments for task id ${this.taskId}`);
      console.log(taskComments);
      this.comments = taskComments;
    });
  }
    ngOnDestroy(): void {
      this.commentsSubscription.unsubscribe();
    }

}

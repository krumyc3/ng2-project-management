import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../store/initialState';
import { OnDestroy } from '@angular/core';
import { Subscribable, Observable } from 'rxjs/Observable';
import { Subscription } from 'apollo-client/util/Observable';
import { Comment } from '../../../models/comment';
import { CommentsService } from '../../../comments.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit, OnDestroy {
  @Input() taskId: string;
  @Input() comments: Comment[];
  commentsSubscription: Subscription;
  commentsActive = false;

  constructor(
    private store: NgRedux<InitialAppState>,
    private commentsService: CommentsService,
  ) {
    this.commentsActive = false;

  }

  setUpCommentsSubscription(): void {
    this.commentsSubscription = this.store.select('commentsList').subscribe((commentsList: Comment[]) => {
      console.log('task in set up comments sub');
      if (commentsList.length > 0) {
        this.comments = commentsList.filter(singleComment => singleComment.taskId === this.taskId);
      } else this.comments = [];
    });
  }

  toggleComments(): void {
    console.log('task.component#toggleComments()');
    this.commentsActive = !this.commentsActive;
  }
  commentsLength(): number {
    return this.comments.length;
  }
  hasComments(): boolean {
    return this.commentsLength() > 0;
  }

  ngOnInit() {
    this.setUpCommentsSubscription();
    this.commentsService.getTaskComments(this.taskId);
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }
}

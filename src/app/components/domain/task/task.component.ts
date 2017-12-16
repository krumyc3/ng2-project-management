import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Task } from '../../../models/task';
import { Output } from '@angular/core';
import { CommentsService } from '../../../comments.service';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../store/initialState';
import { Comment } from '../../../models/comment';
import { TaskStatuses } from '../../../enums/task.status.enum';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  comments: Comment[];
  commentsSubscription: Subscription;
  @Output() onDeleteTaskIntent: EventEmitter<Task> = new EventEmitter<Task>();
  commentsActive = false;
  constructor(private commentsService: CommentsService, private store: NgRedux<InitialAppState>) {
    this.commentsActive = false;
    this.setUpCommentsSubscription();
  }

  ngOnInit() {
    this.commentsService.getTaskComments(this.task.id);
  }
  toggleComments(): void {
    console.log('task.component#toggleComments()');
    this.commentsActive = !this.commentsActive;
  }
  setUpCommentsSubscription(): void {
    this.commentsSubscription = this.store.select('commentsList').subscribe((commentsList: Comment[]) => {
      this.comments = commentsList.filter(singleComment => singleComment.taskId === this.task.id);
    });
  }
  taskStatuses() {
    return Task.availableTaskStatuses();
  }

  changeTaskStatus(previousState: string) {
    switch (previousState) {
      case 'No status':
        this.task.status = TaskStatuses.IN_PROGRESS;
        break;
      case 'In progress':
        this.task.status = TaskStatuses.COMPLETED;
        break;
      case 'Completed':
        this.task.status = TaskStatuses.NO_STATUS;
        break;
      default:
        break;
    }
  }
  commentsLength(): number {
    return this.task.comments.length;
  }
  hasComments(): boolean {
    return this.commentsLength() > 0;
  }
  deleteTask() {
    this.onDeleteTaskIntent.emit(this.task);
  }
}

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
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() onDeleteTaskIntent: EventEmitter<Task> = new EventEmitter<Task>();
  constructor(private taskService: TasksService, private store: NgRedux<InitialAppState>) {
  }

  ngOnInit() {
  }

  taskStatuses() {
    return Task.availableTaskStatuses();
  }

  changeTaskStatus(previousState: TaskStatuses) {
    if (previousState) {
      switch (previousState) {
        case TaskStatuses.NO_STATUS:
          this.task.status = TaskStatuses.IN_PROGRESS;
          break;
        case TaskStatuses.IN_PROGRESS:
          this.task.status = TaskStatuses.COMPLETED;
          break;
        case TaskStatuses.COMPLETED:
          this.task.status = TaskStatuses.NO_STATUS;
          break;
        default:
          break;
      }
      this.taskService.updateTaskStatus(this.task.id, this.task.status);
    }
  }


  deleteTask() {
    this.onDeleteTaskIntent.emit(this.task);
  }
}

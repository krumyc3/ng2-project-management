import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Task } from '../../../models/task';
import { Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() onDeleteTaskIntent: EventEmitter<Task> = new EventEmitter<Task>();
  commentsActive: Boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleComments(): void {
    this.commentsActive = !this.commentsActive;
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

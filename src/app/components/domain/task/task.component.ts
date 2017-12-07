import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
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
}

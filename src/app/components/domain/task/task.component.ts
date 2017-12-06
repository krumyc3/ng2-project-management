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
  constructor() { }

  ngOnInit() {
  }

}

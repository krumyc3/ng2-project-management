import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() tasks: Task[];
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() tasks: Task[];
  @Input() onlyDescription: Boolean = true;
  constructor() { }

  ngOnInit() {
  }

}

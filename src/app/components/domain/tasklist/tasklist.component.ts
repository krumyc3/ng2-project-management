import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/task';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() tasks: Task[];
  constructor(private backend: ProjectService) { }

  ngOnInit() {
    // this.backend.listenForCommentChanges();
  }

}

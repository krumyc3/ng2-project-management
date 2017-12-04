import { Component, OnInit, Input } from '@angular/core';
import { Backend } from '../../../backend/backend';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  private projects: Project[];
  constructor(private backend: Backend) { }

  ngOnInit() {
    this.backend.getProjects().then((projects) => {
      this.projects = projects;
    });
  }

}

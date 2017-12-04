import { Component, OnInit } from '@angular/core';
import {Backend} from '../backend/backend';
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {


  constructor(private backend: Backend) { }
  showProjects() {
    console.log('should show porjects');
    this.backend.getProjects().then((data) => console.log(data));
  }
  ngOnInit() {
    this.showProjects();
  }

}

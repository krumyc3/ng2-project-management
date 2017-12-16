import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.css']
})
export class ProjectFilterComponent implements OnInit {
  filtersVisible: Boolean = false;
  projectName: String = '';
  constructor() { }

  ngOnInit() {
  }
  clearProjectName() {
    this.projectName = '';
  }
  toggleFiltersVisibility() {
    this.filtersVisible = !this.filtersVisible;
  }
}

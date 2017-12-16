import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.css']
})
export class ProjectFilterComponent implements OnInit {
  filtersVisible: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleFiltersVisibility() {
    this.filtersVisible = !this.filtersVisible;
  }
}

import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.css']
})
export class ProjectFilterComponent implements OnInit {
  filtersVisible: Boolean = true;
  projectName: string;
  @Output() onNameFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClearNameFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
    this.projectName = '';
  }

  ngOnInit() {
  }
  clearProjectName() {
    this.projectName = '';
    this.clearProjectsFilter();
  }
  toggleFiltersVisibility() {
    this.filtersVisible = !this.filtersVisible;
  }
  isProjectNameEmpty(): boolean {
    return this.projectName.length < 1;
  }
  clearProjectsFilter() {
    this.onClearNameFilter.emit(true);
  }
  submitProjectsFilter() {
    if (!this.isProjectNameEmpty()) {
      this.onNameFilter.emit(this.projectName);
    } else {
      this.clearProjectsFilter();
    }
  }
}

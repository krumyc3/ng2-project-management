import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Project } from '../../../../models/project';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit {
  @Input() isOpen: Boolean = false;
  private project: Project = new Project('', '', '', null, null);
  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.isOpen = false;
  }

  createProject(): void {
  }

}

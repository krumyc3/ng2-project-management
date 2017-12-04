import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit {
  @Input() isOpen: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  closeModal(): void {
    this.isOpen = false;
  }

  createProject(): void {
  }

}

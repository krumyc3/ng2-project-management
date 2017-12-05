import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Project } from '../../../../models/project';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../../store/initialState';
import { ModalsActions } from '../../../../store/actions/modals.actions';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit {
  @Input() isOpen: Boolean = false;
  subscription;
  private project: Project = new Project('', '', '', null, null);
  constructor(private store: NgRedux<InitialAppState>, private modalActions: ModalsActions) { }
  ngOnInit() {
    this.subscription = this.store.select<any>('modalsState').subscribe((status) => {
      console.log(status.newProjectModalActive);
      this.isOpen = status.newProjectModalActive;
    });
  }

  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal());
  }

  createProject(): void {
  }

}

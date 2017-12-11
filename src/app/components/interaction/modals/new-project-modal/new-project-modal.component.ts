import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Project } from '../../../../models/project';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../../store/initialState';
import { ModalsActions, ModalTypes } from '../../../../store/actions/modals.actions';
import { ProjectService } from '../../../../services/project.service';
import { ModalInterface } from '../modal-interface';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit, ModalInterface {
  modalActions: ModalsActions;
  @Input() isOpen: Boolean = false;
  subscription;
  private project: Project = new Project('', '', '', null, [], []);
  constructor(private store: NgRedux<InitialAppState>, modalActions: ModalsActions, private projectService: ProjectService) {
    this.modalActions = modalActions;
   }
  ngOnInit() {
    this.subscription = this.store.select<any>('modalsState').subscribe((status) => {
      this.isOpen = status.newProjectModalActive;
    });
  }

  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal(ModalTypes.ADD_NEW_PROJECT));
  }

  createProject(): void {
    this.projectService.createProject(this.project);
    this.closeModal();
  }

}

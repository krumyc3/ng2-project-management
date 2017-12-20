import { Component, OnInit, Input } from '@angular/core';
import { ModalInterface } from '../modal-interface';
import { ModalsActions, ModalTypes } from '../../../../store/actions/modals.actions';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../../store/initialState';
import { ProjectService } from '../../../../services/project.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Project } from '../../../../models/project';
import { EditingAction, EditingActions } from '../../../../store/actions/editing.actions';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent implements OnInit, ModalInterface, OnDestroy {
  modalActions: ModalsActions;
  isOpen: Boolean = false;
  subscription: any;
  @Input() project: Project = new Project('', null, '', '', null, [], [], new Date());
  projectSubscription: any;
  constructor
  (private store: NgRedux<InitialAppState>,
    private projectService: ProjectService,
    modalActions: ModalsActions,
    private notification: NotificationsService,
  ) {
    this.modalActions = modalActions;
  }
  ngOnInit() {
    this.setUpSubscriptions();
  }

  setUpSubscriptions(): void {
    this.subscription = this.store.select<any>('modalsState').subscribe((status) => {
      this.isOpen = status.editProjectModalActive;
    });

    this.projectSubscription = this.store.select<any>('editingResource').subscribe((editingState) => {
      this.project = editingState.project;
    });
  }
  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal(ModalTypes.EDIT_PROJECT));
  }
  updateProject() {
    this.projectService.updateProject(JSON.parse(JSON.stringify(this.project)));
    this.closeModal();
    this.notification.success('Updated', 'Project updated');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

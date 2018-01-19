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
import { Client } from '../../../../models/client';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent implements OnInit, ModalInterface, OnDestroy {
  modalActions: ModalsActions;
  isOpen: boolean;
  modalSubscription: Subscription;
  clients: Client[];
  clientsSubscription: Subscription;
  @Input() project: Project = new Project('', new Client('0', 'No client'), '', '', null, [], [], new Date());
  selectedClient: Client = new Client('', '');
  projectSubscription: Subscription;
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
    this.modalSubscription = this.store.select<any>('modalsState').subscribe((status) => {
      if (status !== this.isOpen) this.isOpen = status.editProjectModalActive;
    });

    this.projectSubscription = this.store.select<any>('editingResource').subscribe((editingState) => {
      console.log('editing state project');
      console.log(editingState.project);
      this.project = editingState.project;
    });

    this.clientsSubscription = this.store.select<any>('clientsList').subscribe((clientsList: Client[]) => {
      console.log('clients list');
      console.log(clientsList);
      this.clients = clientsList;
    });
  }
  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal(ModalTypes.EDIT_PROJECT));
  }
  updateProject() {
    if (this.selectedClient.id !== '') {
      this.project.client = this.selectedClient;
    }
    this.projectService.updateProject(JSON.parse(JSON.stringify(this.project)));
    this.closeModal();
  }

  openNewClientModal() {
    this.store.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_CLIENT));
  }
  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    this.clientsSubscription.unsubscribe();
    this.projectSubscription.unsubscribe();
  }

}

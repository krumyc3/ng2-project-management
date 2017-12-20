import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Project } from '../../../../models/project';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState, INITIAL_STATE } from '../../../../store/initialState';
import { ModalsActions, ModalTypes } from '../../../../store/actions/modals.actions';
import { ProjectService } from '../../../../services/project.service';
import { ModalInterface } from '../modal-interface';
import { getLocaleDateTimeFormat } from '@angular/common/src/i18n/locale_data_api';
import { Client } from '../../../../models/client';
import { Subscription } from 'apollo-client/util/Observable';
import { ClientsService } from '../../../../clients.service';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit, ModalInterface {
  modalActions: ModalsActions;
  @Input() isOpen: Boolean = false;
  subscription;
  clientsSubscription: Subscription;
  selectedClientId: String;
  private clients: Client[];
  private project: Project = new Project('', null, '', '', null, [], [], new Date());
  constructor(
    private store: NgRedux<InitialAppState>,
    modalActions: ModalsActions,
    private clientService: ClientsService,
    private projectService: ProjectService) {
    this.modalActions = modalActions;
   }
  ngOnInit() {
    this.subscription = this.store.select<any>('modalsState').subscribe((status) => {
      this.isOpen = status.newProjectModalActive;
      if (status.newProjectModalActive === true) {
        this.clientService.getClients();
      }
    });

    this.clientsSubscription = this.store.select<Client[]>('clientsList').subscribe((clientList: Client[]) => {
      this.clients = clientList;
    });
  }

  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal(ModalTypes.ADD_NEW_PROJECT));
  }

  openNewClientModal(): void {
    this.store.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_CLIENT));
  }
  createProject(): void {
    const selectedClient = this.clients.find(client => client.id === this.selectedClientId);
    if (selectedClient) {
      this.project.client =  selectedClient;
    }
    this.projectService.createProject(this.project);
    this.closeModal();
  }

}

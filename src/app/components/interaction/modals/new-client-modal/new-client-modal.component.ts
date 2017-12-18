import { Component, OnInit } from '@angular/core';
import { ModalInterface } from '../modal-interface';
import { ModalsActions, ModalTypes, ModalsAction } from '../../../../store/actions/modals.actions';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../../store/initialState';
import { IModalState } from '../../../../store/reducers/modals.reducer';
import { Client } from '../../../../models/client';
import { ClientsService } from '../../../../clients.service';

@Component({
  selector: 'app-new-client-modal',
  templateUrl: './new-client-modal.component.html',
  styleUrls: ['./new-client-modal.component.css']
})
export class NewClientModalComponent implements OnInit, ModalInterface {
  isOpen: Boolean = true;
  subscription: any;
  modalActions: ModalsActions;
  client: Client = new Client('', '');
  constructor(modalActions: ModalsActions,
    private clientService: ClientsService,
    private store: NgRedux<InitialAppState>) {
    this.modalActions = modalActions;
  }

  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal(ModalTypes.ADD_NEW_CLIENT));
  }

  createClient(): void {
    if (this.client.name !== '') {
      this.clientService.addClient(JSON.parse(JSON.stringify(this.client)));
      this.client.name = '';
      this.client.id = '';
      this.closeModal();
    }
  }
  ngOnInit() {
    this.subscription = this.store.select('modalsState').subscribe((status: IModalState ) => {
      this.isOpen = status.newClientModalActive;
    });
  }

}

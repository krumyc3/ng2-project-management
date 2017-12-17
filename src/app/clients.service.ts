import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from './store/initialState';
import { Client } from './models/client';
import { ClientActions } from './store/actions/client.actions';

@Injectable()
export class ClientsService {

  constructor(private store: NgRedux<InitialAppState>, private clientActions: ClientActions) { }
  addClient(newClient: Client) {
    this.store.dispatch(this.clientActions.addClient(newClient));
  }

  getClients() {}
  getClientDetails(clientId: string) {}
  deleteClient(clientId: string) {}
  assignClientToProject(clientId: string, projectId: string) {}
  updateClient(clientId: string) {}
}

import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from './store/initialState';
import { Client } from './models/client';

@Injectable()
export class ClientsService {

  constructor(private store: NgRedux<InitialAppState>) { }
  addClient(newClient: Client) {
  }

  getClients() {}
  getClientDetails(clientId: string) {}
  deleteClient(clientId: string) {}
  assignClientToProject(clientId: string, projectId: string) {}
  updateClient(clientId: string) {}
}

import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from './store/initialState';
import { Client } from './models/client';
import { ClientActions } from './store/actions/client.actions';
import { Apollo } from 'apollo-angular/Apollo';
import { MAddClient } from './backend/graph.mutations';
import { NotificationsService } from 'angular2-notifications';
import { QAllClients } from './backend/graph.queries';

@Injectable()
export class ClientsService {

  constructor(
    private store: NgRedux<InitialAppState>,
    private clientActions: ClientActions,
    private apollo: Apollo,
    private notifications: NotificationsService
  ) { }
  addClient(newClient: Client) {
    this.apollo.mutate({
      mutation: MAddClient,
      variables: {
        clientName: newClient.name
      }
    }).subscribe(({data}: any) => {
      const response = data.createClient;
      this.store.dispatch(this.clientActions.addClient(new Client(response.id, response.name)));
      this.notifications.success('Success', `Created client ${response.name}`);
    });
  }

  getClients() {
    this.apollo.query({
      query: QAllClients,
      variables: {
        userId: this.store.getState().userState.id,
      }
    }).subscribe(({data}: any) => {
      const response = data.allClients;
      const clientsArray = response.map((clientData: Client) => {
        return new Client(clientData.id, clientData.name);
      });
      this.store.dispatch(this.clientActions.setClients(clientsArray));
    }, (error) => {
      this.notifications.error('Error!', error.message);
    });
  }
  getClientDetails(clientId: string) {}
  deleteClient(clientId: string) {}
  assignClientToProject(clientId: string, projectId: string) {}
  updateClient(clientId: string) {}
}

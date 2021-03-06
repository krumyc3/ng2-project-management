import { Action } from 'redux';
import { Client } from '../../models/client';
import { Injectable } from '@angular/core';

export interface ClientAction extends Action {
  type: string;
  payload: Client | Client[] | string;
}

@Injectable()
export class ClientActions {
  static SET_CLIENTS = 'SET_CLIENTS';
  static ADD_CLIENT = 'ADD_CLIENT';
  static DELETE_CLIENT = 'DELETE_CLIENT';
  static UPDATE_CLIENT = 'UPDATE_CLIENT';
  setClients(clientList: Client[]): ClientAction {
    return {
      type: ClientActions.SET_CLIENTS,
      payload: clientList,
    };
  }
  addClient(client: Client): ClientAction {
    return {
      type: ClientActions.ADD_CLIENT,
      payload: client
    };
  }
}

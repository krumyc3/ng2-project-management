import { Client } from '../../models/client';
import { ClientAction, ClientActions } from '../actions/client.actions';

export function clientReducer(state: Client[] = [], action: ClientAction) {
  switch (action.type) {
    case ClientActions.SET_CLIENTS:
      return action.payload;
    case ClientActions.ADD_CLIENT:
      return [...state, action.payload];
    default:
      return state;
  }
}

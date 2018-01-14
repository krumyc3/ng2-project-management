import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { InitialAppState } from '../../../store/initialState';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ClientsService } from '../../../clients.service';
import { ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {
  clients: Client[];
  private clientSubscription: Subscription;
  constructor(private store: NgRedux<InitialAppState>,
    private clientService: ClientsService, private modalActions: ModalsActions) {
    this.setUpClientSubscription();
  }
  setUpClientSubscription() {
    this.clientSubscription = this.store.select<Client[]>('clientsList').subscribe((clientList: Client[]) => {
      this.clients = clientList;
    });
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }
  ngOnInit() {
    this.clientService.getClients();
  }

  openNewClientModal() {
    this.store.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_CLIENT));
  }

}

import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Client } from '../../../../models/client';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../../store/initialState';

import { ClientsService } from '../../../../clients.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.css']
})
export class ProjectFilterComponent implements OnInit, OnDestroy {
  filtersVisible: Boolean = true;
  projectName: string;
  private clientsSubscription: Subscription = new Subscription();
  selectedClientId: string;
  clients: Client[];
  @Output() onNameFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClearNameFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClientFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClearClientFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private store: NgRedux<InitialAppState>,
    private clientsService: ClientsService) {
    this.projectName = '';
  }

  ngOnInit() {
    this.selectedClientId = '';
    this.submitClientFilter();
    this.fetchAvailableClients();
    this.setUpClientsSubscription();
  }
  ngOnDestroy() {
    this.clientsSubscription.unsubscribe();
  }
  fetchAvailableClients(): void {
    // this.clientsService.getClients();
  }
  setUpClientsSubscription(): void {
    this.clientsSubscription = this.store.select('clientsList').subscribe((clientsList: Client[]) => {
      this.clients = clientsList;
    });
  }

  clearProjectName() {
    this.projectName = '';
    this.clearProjectsFilter();
  }
  toggleFiltersVisibility() {
    this.filtersVisible = !this.filtersVisible;
  }
  isProjectNameEmpty(): boolean {
    return this.projectName.length < 1;
  }
  clearProjectsFilter() {
    this.onClearNameFilter.emit(true);
  }
  submitProjectsFilter() {
    if (!this.isProjectNameEmpty()) {
      this.onNameFilter.emit(this.projectName);
    } else {
      this.clearProjectsFilter();
    }
  }
  submitClientFilter() {
    this.onClientFilter.emit(this.selectedClientId);
  }

  clearFilters() {
    this.clearProjectName();
    this.clearProjectsFilter();
  }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../store/initialState';
import { Subscription } from 'rxjs/Subscription';
import { ModalsAction, ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';
import { ClientsService } from '../../../clients.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  @Input() private projects: Project[];
  private nonFilteredProjects: Project[];
  private subscription: Subscription;
  private filterTerm: string;
  isLoading: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private ngRedux: NgRedux<InitialAppState>, private modalActions: ModalsActions, private projectService: ProjectService, private clientService: ClientsService) {
    this.filterTerm = '';
    this.isLoading = false;
   }
  ngOnInit() {
    this.setUpProjectSubscription();
    this.clientService.getClients();
    this.isLoading = true;
    this.projectService.getAllProjects();
  }
  setUpProjectSubscription(): any {
    this.subscription = this.ngRedux.select<Project[]>('projectsList').subscribe((projectList) => {
      this.nonFilteredProjects = projectList;
      this.projects = projectList;
      this.isLoading = false;
    });
  }

  updateNameFilterTerm(nameFromFilter: string) {
    this.projects = this.projects.filter(project => {
      return nameFromFilter === '' ? true : project.name.includes(nameFromFilter);
    });
  }

  clearNameFilterTerm(clear: boolean) {
    if (clear) {
      this.projects = JSON.parse(JSON.stringify(this.nonFilteredProjects));
    }
  }

  updateClientFilterTerm(clientName: string) {
    this.projects = JSON.parse(JSON.stringify(this.nonFilteredProjects));
    this.projects = this.projects.filter(project => {
      if (project.client) {
        return clientName === '' ? true : project.client.name === clientName;
      } else {
        return false;
      }
    });
  }

  clearClientFilterTerm(clear: boolean) {
    if (clear) {
      this.projects = JSON.parse(JSON.stringify(this.nonFilteredProjects));
    }
  }
  openNewProjectModal() {
    this.ngRedux.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_PROJECT));
  }

  openNewClientModal() {
    this.ngRedux.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_CLIENT));
  }
  onDestroy(): any {
    this.subscription.unsubscribe();
  }
}

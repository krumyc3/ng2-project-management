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
  private projectsSubscription: Subscription;
  private nameFilterTerm: string;
  private clientIdFilterTerm: string;
  isLoading: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private ngRedux: NgRedux<InitialAppState>, private modalActions: ModalsActions, private projectService: ProjectService, private clientService: ClientsService) {
    this.nameFilterTerm = '';
    this.isLoading = false;
   }
  ngOnInit() {
    this.setUpProjectSubscription();
    this.clientService.getClients();
    this.isLoading = true;
    this.projectService.getAllProjects();
  }
  setUpProjectSubscription(): any {
    this.projectsSubscription = this.ngRedux.select<Project[]>('projectsList').subscribe((projectList) => {
      this.projects = projectList;
      this.isLoading = false;
    });
  }

  updateNameFilterTerm(nameFromFilter: string) {
    this.nameFilterTerm = nameFromFilter;
  }

  clearNameFilterTerm(clear: boolean) {
    if (clear) this.nameFilterTerm = '';
  }

  updateClientFilterTerm(clientName: string) {
    this.clientIdFilterTerm = clientName;
  }

  clearClientFilterTerm(clear: boolean) {
    if (clear) this.clientIdFilterTerm = '';
  }
  openNewProjectModal() {
    this.ngRedux.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_PROJECT));
  }

  openNewClientModal() {
    this.ngRedux.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_CLIENT));
  }
  onDestroy(): any {
    this.projectsSubscription.unsubscribe();
  }
}

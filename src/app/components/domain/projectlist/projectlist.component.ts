import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../store/initialState';
import { Subscription } from 'rxjs/Subscription';
import { ModalsAction, ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';

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
  constructor(private ngRedux: NgRedux<InitialAppState>, private modalActions: ModalsActions, private backendService: ProjectService) {
    this.filterTerm = '';
   }
  ngOnInit() {
    this.setUpProjectSubscription();
    this.backendService.getAllProjects();
  }
  setUpProjectSubscription(): any {
    this.subscription = this.ngRedux.select<Project[]>('projectsList').subscribe((projectList) => {
      this.nonFilteredProjects = projectList;
      this.projects = projectList;
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

  openNewProjectModal() {
    this.ngRedux.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_PROJECT));
  }

  onDestroy(): any {
    this.subscription.unsubscribe();
  }
}

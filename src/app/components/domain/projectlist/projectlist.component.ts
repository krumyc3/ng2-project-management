import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Project } from '../../../models/project';
import { BackendService } from '../../../services/project.service';
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
  subscription: Subscription;
  constructor(private ngRedux: NgRedux<InitialAppState>, private modalActions: ModalsActions) { }
  ngOnInit() {
    this.setUpProjectSubscription();
  }
  setUpProjectSubscription(): any {
    this.subscription = this.ngRedux.select<Project[]>('projectsList').subscribe((projectList) => {
      this.projects = projectList;
    });
  }
  onDestroy(): any {
    this.subscription.unsubscribe();
  }

  openNewProjectModal() {
    this.ngRedux.dispatch(this.modalActions.openModal(ModalTypes.ADD_NEW_PROJECT));
  }

}

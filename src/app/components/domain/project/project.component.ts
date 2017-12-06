import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { Task } from '../../../models/task';
import { InitialAppState } from '../../../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() tasks: Task[];
  @Input() onlyDescription: Boolean = true;
  constructor(private store: NgRedux<InitialAppState>, private modalActions: ModalsActions) { }

  ngOnInit() {
  }

  openNewTaskModal() {
    this.store.dispatch(
      this.modalActions.openModal(ModalTypes.ADD_NEW_TASK)
    );
  }
}

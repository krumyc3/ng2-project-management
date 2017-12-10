import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { Task } from '../../../models/task';
import { InitialAppState } from '../../../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';
import { EditingActions } from '../../../store/actions/editing.actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() tasks: Task[];
  @Input() onlyDescription: Boolean = true;
  constructor(private store: NgRedux<InitialAppState>, private modalActions: ModalsActions, private editingActions: EditingActions) { }

  ngOnInit() {
  }

  openNewTaskModal() {
    this.store.dispatch(
      this.modalActions.openModal(ModalTypes.ADD_NEW_TASK)
    );
  }

  editProject() {
    this.store.dispatch(
      this.modalActions.openModal(ModalTypes.EDIT_PROJECT)
    );
    this.store.dispatch(
      this.editingActions.editProject(this.project)
    );
  }
}

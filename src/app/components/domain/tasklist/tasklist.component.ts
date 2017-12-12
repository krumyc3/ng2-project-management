import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/task';
import { ProjectService } from '../../../services/project.service';
import { InitialAppState } from '../../../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() tasks: Task[];
  constructor(private backend: ProjectService, private store: NgRedux<InitialAppState>, private modalActions: ModalsActions) { }

  ngOnInit() {
    // this.backend.listenForCommentChanges();
  }

  openNewTaskModal() {
    this.store.dispatch(
      this.modalActions.openModal(ModalTypes.ADD_NEW_TASK)
    );
  }

}

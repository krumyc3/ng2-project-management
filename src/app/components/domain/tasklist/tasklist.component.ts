import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/task';
import { ProjectService } from '../../../services/project.service';
import { InitialAppState } from '../../../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() tasks: Task[];
  isDeleteTaskModalActive: Boolean = false;
  taskToDelete: Task = new Task('', '', '', '', '', null, null, null);
  constructor(private taskService: TasksService, private store: NgRedux<InitialAppState>, private modalActions: ModalsActions) { }

  ngOnInit() {
  }

  openNewTaskModal() {
    this.store.dispatch(
      this.modalActions.openModal(ModalTypes.ADD_NEW_TASK)
    );
  }

  deleteTask(task: Task) {
    this.taskToDelete = task;
    this.isDeleteTaskModalActive = true;
  }

  confirmTaskDeletion() {
    this.taskService.deleteTask(this.taskToDelete.id);
    this.isDeleteTaskModalActive = false;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../models/task';
import { ProjectService } from '../../../services/project.service';
import { InitialAppState } from '../../../store/initialState';
import { NgRedux } from '@angular-redux/store';
import { ModalsActions, ModalTypes } from '../../../store/actions/modals.actions';
import { TasksService } from '../../../services/tasks.service';
import { OnDestroy } from '@angular/core';
import { Subscribable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CommentsService } from '../../../comments.service';
import { TaskStatuses } from '../../../enums/task.status.enum';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  @Input() projectId: string;

  tasksSubscription: Subscription;
  isDeleteTaskModalActive: Boolean = false;
  taskToDelete: Task = new Task('', TaskStatuses.NO_STATUS, '', '', '', null, null, null);
  constructor(
    private taskService: TasksService,
    private store: NgRedux<InitialAppState>,
    private modalActions: ModalsActions) { }

  ngOnInit() {
    this.setUpSubscription();
  }

  openNewTaskModal() {
    this.store.dispatch(
      this.modalActions.openModal(ModalTypes.ADD_NEW_TASK)
    );
  }
  setUpSubscription(): void {
    this.tasksSubscription = this.store.select('tasksList').subscribe((tasksList: Task[]) => {
      this.tasks = tasksList.filter(singleTask => singleTask.projectId === this.projectId);
    });
  }
  deleteTask(task: Task) {
    this.taskToDelete = task;
    this.isDeleteTaskModalActive = true;
  }

  confirmTaskDeletion() {
    this.taskService.deleteTask(this.taskToDelete.id);
    this.isDeleteTaskModalActive = false;
  }


  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }

}

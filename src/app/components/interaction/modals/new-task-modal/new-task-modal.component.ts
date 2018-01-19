import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalInterface } from '../modal-interface';
import { Task } from '../../../../models/task';
import { select, NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../../store/initialState';
import { ModalsActions, ModalsAction, ModalTypes } from '../../../../store/actions/modals.actions';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../../services/tasks.service';
import { ProjectService } from '../../../../services/project.service';
import { TaskStatuses } from '../../../../enums/task.status.enum';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit, ModalInterface, OnDestroy {
  modalActions: ModalsActions;
  @Input() isOpen: boolean;
  @Input() projectId: string;
  task: Task = new Task('', TaskStatuses.NO_STATUS,  '', '', '', null, null, []);
  modalSubscription: Subscription;
  routerSubscription: Subscription;
  constructor(
    private store: NgRedux<InitialAppState>, modalActions: ModalsActions,
    private route: ActivatedRoute, private tasksService: TasksService
  ) {
    this.modalActions = modalActions;
  }
  ngOnInit() {
    this.modalSubscription = this.store.select<any>('modalsState').subscribe((status) => {
      console.log(status.newTaskModalActive);
      this.isOpen = status.newTaskModalActive;
    });

    this.routerSubscription = this.route.params.subscribe(params => {
      this.projectId = params.id;
    });
  }
  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal(ModalTypes.ADD_NEW_TASK));
  }
  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }
  createTask() {
    this.task.projectId = this.projectId;
    this.tasksService.addTaskToProject(this.task.projectId, this.task);
    this.isOpen = false;
  }

}

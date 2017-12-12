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

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit, ModalInterface, OnDestroy {
  modalActions: ModalsActions;
  @Input() isOpen: Boolean;
  @Input() projectId: string;
  private task: Task = new Task('', '', '', '', '', null, null, []);
  subscription: any;
  routerSubscription: Subscription;
  constructor(
    private store: NgRedux<InitialAppState>, modalActions: ModalsActions, 
    private route: ActivatedRoute, private projectService: ProjectService
  ) {
    this.modalActions = modalActions;
  }
  ngOnInit() {
    this.subscription = this.store.select<any>('modalsState').subscribe((status) => {
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
    this.subscription.unsubscribe();
  }
  createTask() {
    this.task.projectId = this.projectId;
    this.projectService.addTaskToProject(this.task.projectId, this.task);
    this.isOpen = false;
  }

}

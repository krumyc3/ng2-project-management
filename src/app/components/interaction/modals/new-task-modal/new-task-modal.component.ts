import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalInterface } from '../modal-interface';
import { Task } from '../../../../models/task';
import { select, NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../../store/initialState';
import { ModalsActions, ModalsAction, ModalTypes } from '../../../../store/actions/modals.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit, ModalInterface, OnDestroy {
  modalActions: ModalsActions;
  @Input() isOpen: Boolean;
  private task: Task = new Task('', '', '', '', null, null);
  subscription: any;
  constructor(private store: NgRedux<InitialAppState>, modalActions: ModalsActions) {
    this.modalActions = modalActions;
  }
  ngOnInit() {
    this.subscription = this.store.select<any>('modalsState').subscribe((status) => {
      console.log(status.newTaskModalActive);
      this.isOpen = status.newTaskModalActive;
    });
  }
  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal(ModalTypes.ADD_NEW_TASK));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  createTask() {
    console.log('should create task');
  }

}

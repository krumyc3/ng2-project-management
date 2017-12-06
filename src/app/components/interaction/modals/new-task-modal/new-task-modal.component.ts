import { Component, OnInit, Input } from '@angular/core';
import { ModalInterface } from '../modal-interface';
import { Task } from '../../../../models/task';
import { select, NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../../store/initialState';
import { ModalsActions, ModalsAction } from '../../../../store/actions/modals.actions';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit, ModalInterface {
  modalActions: ModalsActions;
  @Input() isOpen: Boolean;
  private task: Task = new Task('', '', '', '', null, null);
  subscription: any;
  constructor(private store: NgRedux<InitialAppState>, modalActions: ModalsActions) {
    this.modalActions = modalActions;
  }
  ngOnInit() {
  }
  closeModal(): void {
    this.store.dispatch(this.modalActions.closeModal());
  }

  createTask() {
    console.log('should create task');
  }

}

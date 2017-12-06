import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../store/initialState';
import { ModalsActions } from '../../../store/actions/modals.actions';

export interface ModalInterface {
  isOpen: Boolean;
  subscription: any;
  modalActions: ModalsActions;
  closeModal(): void;
}

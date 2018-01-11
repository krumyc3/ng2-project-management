import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../../../store/initialState';
import { ModalsActions } from '../../../store/actions/modals.actions';
import { Subscription } from 'rxjs/Subscription';

export interface ModalInterface {
  isOpen: boolean;
  modalSubscription: Subscription;
  modalActions: ModalsActions;
  closeModal(): void;
}

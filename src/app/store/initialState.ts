import { Project } from '../models/project';

export interface InitialAppState {
  projectsList: Project[];
  modalsState: any;
}

export const INITIAL_STATE: InitialAppState = {
  projectsList: [],
  modalsState: '',
};


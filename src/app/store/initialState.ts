import { Project } from '../models/project';
import { Comment } from '../models/comment';
import { Task } from '../models/task';

export interface InitialAppState {
  projectsList: Project[];
  commentsList: any;
  tasksList: any;
  modalsState: any;
}

export const INITIAL_STATE: InitialAppState = {
  projectsList: [],
  commentsList: [],
  tasksList: [],
  modalsState: {
    newProjectModalActive: false
  },
};


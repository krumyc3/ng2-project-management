import { Project } from '../models/project';
import { Comment } from '../models/comment';
import { Task } from '../models/task';
import { Client } from '../models/client';

export interface InitialAppState {
  projectsList: Project[];
  commentsList: any;
  tasksList: any;
  modalsState: any;
  editingResource: any;
  clientsList: Client[];
  userState: {
    id: string,
    email: string,
    token: string
  };
}

export const INITIAL_STATE: InitialAppState = {
  projectsList: [],
  commentsList: [],
  tasksList: [],
  clientsList: [],
  userState: {
    id: '',
    email: '',
    token: ''
  },
  editingResource: {
    project: {}
  },
  modalsState: {
    newProjectModalActive: false
  },
};


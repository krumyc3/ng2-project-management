import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment';
import { Action } from 'redux';

export interface TaskAction {
  type: string;
  payload: any;
}
@Injectable()
export class TaskActions {
  static SET_COMMENTS = 'SET_COMMENTS';

  setComments(commentsList: Comment[]): TaskAction {
    return {
      type: TaskActions.SET_COMMENTS,
      payload: commentsList,
    };
  }
}

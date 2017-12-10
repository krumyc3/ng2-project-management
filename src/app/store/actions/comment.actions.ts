import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment';
import { Action } from 'redux';

export interface CommentAction extends Action {
  type: any;
  payload: any;
}
@Injectable()
export class CommentActions {
  static SET_COMMENTS = 'SET_COMMENTS';

  setComments(commentsList: any): CommentAction {
    return {
      type: CommentActions.SET_COMMENTS,
      payload: commentsList,
    };
  }
}


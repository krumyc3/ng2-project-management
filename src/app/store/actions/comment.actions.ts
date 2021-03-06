import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment';
import { Action } from 'redux';

export interface CommentAction extends Action {
  type: string;
  payload: any;
}
@Injectable()
export class CommentActions {
  static SET_COMMENTS = 'SET_COMMENTS';
  static ADD_COMMENT = 'ADD_COMMENT';
  static CLEAR_COMMENTS = 'CLEAR_COMMENTS';
  static LIKE_COMMENT = 'LIKE_COMMENT';
  static DELETE_COMMENT = 'DELETE_COMMENT';
  setComments(commentsList: any): CommentAction {
    return {
      type: CommentActions.SET_COMMENTS,
      payload: commentsList,
    };
  }

  addComment(comment: Comment): CommentAction {
    return {
      type: CommentActions.ADD_COMMENT,
      payload: comment
    };
  }

  deleteComment(commentId: string): CommentAction {
    return {
      type: CommentActions.DELETE_COMMENT,
      payload: {
        commentId
      }
    };
  }

  likeComment(commentId: string): CommentAction {
    return {
      type: CommentActions.LIKE_COMMENT,
      payload: commentId
    };
  }
}


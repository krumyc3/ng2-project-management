import { CommentAction, CommentActions } from '../actions/comment.actions';

export function commentReducer(state = [], action: CommentAction) {
  switch (action.type) {
    case CommentActions.SET_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}

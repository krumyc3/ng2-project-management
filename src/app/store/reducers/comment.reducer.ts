import { CommentAction, CommentActions } from '../actions/comment.actions';

export function commentReducer(state = [], action: CommentAction) {
  switch (action.type) {
    case CommentActions.SET_COMMENTS:
      return action.payload;
    case CommentActions.ADD_COMMENT:
      return [...state, ...action.payload];
    case CommentActions.CLEAR_COMMENTS:
      return [...state.filter(val => false)];
    default:
      return state;
  }
}

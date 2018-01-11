import { CommentAction, CommentActions } from '../actions/comment.actions';
import { Comment } from '../../models/comment';

export function commentReducer(state = [], action: CommentAction) {
  switch (action.type) {
    case CommentActions.SET_COMMENTS:
      return action.payload;
    case CommentActions.ADD_COMMENT:
      return [...state, ...action.payload];
    case CommentActions.CLEAR_COMMENTS:
      return [...state.filter(val => false)];
    case CommentActions.DELETE_COMMENT:
      return [...state.filter((comment: Comment) => comment.id !== action.payload.commentId)];
    case CommentActions.LIKE_COMMENT:
      return [...state.map((comment: Comment) => {
        if (comment.id === action.payload) {
          return {
            ...comment,
            likes: comment.likes + 1
            };
          } else {
            return comment;
          }})];
    default:
      return state;
  }
}

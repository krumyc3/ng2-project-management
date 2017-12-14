import { ProjectActions } from '../actions/project.actions';
import { TaskActions } from '../actions/task.actions';



export function projectReducer(state = [] , action: any) {
  switch (action.type) {
    case ProjectActions.SET_PROJECTS:
       return action.payload;
    case ProjectActions.ADD_SINGLE_PROJECT:
      return [...state, action.payload];
    case ProjectActions.UPDATE_PROJECT:
      if (state.length < 1) {
        return [action.payload];
      }
      return state.map((singleProject) => {
        if (singleProject.id === action.payload.id) {
          return action.payload;
        } else {
          return singleProject;
        }
      });
    case ProjectActions.DELETE_PROJECT:
      return state.filter(singleProject => singleProject.id !== action.payload);
    case ProjectActions.ADD_TASK_TO_PROJECT:
      return state.map((singleProject) => {
        if (singleProject.id === action.payload.projectId) {
          return {
            ...singleProject,
            tasks: [
              ...singleProject.tasks,
              action.payload.task
            ]
          };
        } else {
          return singleProject;
        }
      });
    case ProjectActions.ADD_COMMMENT_TO_TASK:
      return state.map((singleProject => {
        return {
          ...singleProject,
          tasks: singleProject.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              if (task.comments.length < 1) {
                return action.payload.comment;
              }
              return {
                ...task,
                comments: [...task.comments, action.payload.comment],
              };
            } else {
              return task;
            }
          }),
        };
      }));
    case ProjectActions.DELETE_TASK:
      return state.map((singleProject => {
        return {
          ...singleProject,
          tasks: singleProject.tasks.filter((task => {
            return task.id !== action.payload.taskId;
          })),
        };
      }));
    case ProjectActions.UPDATE_COMMENT_LIKES:
      return state.map((singleProject) => {
        return {
          ...singleProject,
          tasks: singleProject.tasks.map((task => {
            return {
              ...task,
              comments: task.comments.map((comment => {
                if (comment.id === action.payload.commentId) {
                  return {
                    ...comment,
                    likes: action.payload.likes
                  };
                // tslint:disable-next-line:curly
                } else return comment;
              }))
            };
          })),
        };
      });
    default:
      return state;
  }
}

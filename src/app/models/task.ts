import { User } from './user';
import { Comment } from './comment';
import { TaskStatuses } from '../enums/task.status.enum';

export class Task {
  id: string;
  projectId: string;
  status: TaskStatuses;
  title: string;
  description: string;
  due: Date;
  author: User;
  comments: Comment[];
  constructor(
    id: string, status: TaskStatuses, projectId: string, name: string, description: string, due: Date, user: User, comments: Comment[]) {
    this.id = id;
    this.status = status;
    this.projectId = projectId;
    this.title = name;
    this.description = description;
    this.due = due;
    this.author = user;
    this.comments = comments;
  }

  public static availableTaskStatuses(): Array<any> {
    const taskStatusesArray: { key: string, value: string}[] = [];
    for (const key in TaskStatuses) {
      if (TaskStatuses.hasOwnProperty(key)) {
        taskStatusesArray.push({
          key,
          value: TaskStatuses[key],
        });
      }
    }
    return taskStatusesArray;
  }
}

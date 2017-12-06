import { User } from './user';
import { Comment } from './comment';
import { TaskStatus } from '../enums/task.status.enum';

export class Task {
  id: string;
  projectId: string;
  status: TaskStatus;
  name: string;
  description: string;
  due: Date;
  user: User;
  comments: Comment[];
  constructor(
    id: string, status: string, projectId: string, name: string, description: string, due: Date, user: User, comments: Comment[]) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.description = description;
    this.due = due;
    this.user = user;
    this.comments = comments;
  }
}

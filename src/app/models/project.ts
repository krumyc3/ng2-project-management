import { User } from './user';
import { Comment } from './comment';
import { Task } from './task';

export class Project {
  private name: string;
  id: string;
  private description: string;
  private user: User;
  private comments: Array<Comment>;
  tasks: Task[];
  constructor(name: string, id: string, description: string, user: User, comments: Array<Comment>, tasks: Task[]) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.user = user;
    this.comments = comments;
    this.tasks = tasks;
  }
}

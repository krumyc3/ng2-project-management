import { User } from './user';
import { Task } from './task';

export class Comment {
  private user: User;
  content: string;
  taskId: string;
  likes: Number;
  constructor(user: User, taskId: string, content: string, likes: Number) {
    this.user = user;
    this.taskId = taskId;
    this.content = content;
    this.likes = likes;
  }
}

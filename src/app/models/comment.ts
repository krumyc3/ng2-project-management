import { User } from './user';
import { Task } from './task';

export class Comment {
  user: User;
  content: string;
  taskId: string;
  likes: Number;
  createdAt: any;
  constructor(user: User, taskId: string, content: string, likes: Number, createdAt: any) {
    this.user = user;
    this.taskId = taskId;
    this.content = content;
    this.likes = likes;
    this.createdAt = createdAt;
  }
}

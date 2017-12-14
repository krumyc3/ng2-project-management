import { User } from './user';
import { Task } from './task';

export class Comment {
  id: String;
  user: User;
  content: string;
  taskId: string;
  likes: number;
  createdAt: any;
  constructor(id: String, user: User, taskId: string, content: string, likes: number, createdAt: any) {
    this.id = id;
    this.user = user;
    this.taskId = taskId;
    this.content = content;
    this.likes = likes;
    this.createdAt = createdAt;
  }
}

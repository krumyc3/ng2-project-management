import { User } from './user';
import { Task } from './task';

export class Comment {
  id: String;
  author: User;
  content: string;
  taskId: string;
  isReply: boolean;
  likes: number;
  createdAt: any;
  constructor(id: String, user: User, taskId: string, content: string, likes: number, createdAt: any, isReply: boolean = false) {
    this.id = id;
    this.isReply = isReply;
    this.author = user;
    this.taskId = taskId;
    this.content = content;
    this.likes = likes;
    this.createdAt = createdAt;
  }
}

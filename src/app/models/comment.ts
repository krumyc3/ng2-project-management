import { User } from './user';
import { Task } from './task';

export class Comment {
  id: string;
  author: User;
  content: string;
  taskId: string;
  isReply: boolean;
  likes: number;
  createdAt: any;
  own: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(id: string, user: User, taskId: string, content: string, likes: number, createdAt: any, isReply: boolean = false, own: boolean = false) {
    this.id = id;
    this.isReply = isReply;
    this.author = user;
    this.taskId = taskId;
    this.own = own;
    this.content = content;
    this.likes = likes;
    this.createdAt = createdAt;
  }
}

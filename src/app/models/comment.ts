import { User } from './user';
import { Task } from './task';

export class Comment {
  private user: User;
  private task: Task;
  private likes: Number;
}

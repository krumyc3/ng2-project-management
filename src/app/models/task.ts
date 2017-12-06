import { User } from './user';
import { TaskStatus } from '../enums/task.status.enum';

export class Task {
  private id: string;
  projectId: string;
  private status: TaskStatus;
  private name: string;
  private description: string;
  private due: Date;
  private user: User;
  constructor(id: string, status: string, name: string, description: string, due: Date, user: User) {
  }
}

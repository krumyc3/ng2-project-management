import { User } from './user';
import { Comment } from './comment';
import { Task } from './task';
import { Client } from './client';

export class Project {
  public name: string;
  id: string;
  createdAt: Date;
  public description: string;
  private user: User;
  client: Client;
  private comments: Array<Comment>;
  tasks: Task[];
  constructor(
    name: string, client: Client, id: string, description: string, user: User, comments: Array<Comment>, tasks: Task[], createdAt: Date) {
    this.name = name;
    this.id = id;
    this.client = client;
    this.description = description;
    this.user = user;
    this.comments = comments;
    this.createdAt = createdAt;
    this.tasks = tasks;
  }
}

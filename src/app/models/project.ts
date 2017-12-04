import { User } from './user';
import { Comment } from './comment';

export class Project {
  private name: string;
  private id: string;
  private description: string;
  private user: User;
  private comments: Array<Comment>;

  constructor(name: string, id: string, description: string, user: User, comments: Array<Comment>) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.user = user;
    this.comments = comments;
  }
}

import { User } from './user';
import { Comment } from './comment';

export class Project {
  private name: string;
  private id: string;
  private description: string;
  private User: User;
  private Comments: Array<Comment>;

  constructor(name: string, id: string, description: string, user: User, comments: Array<Comment>) {
  }
}

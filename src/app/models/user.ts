import { UserRole } from '../enums/user-role.enum';

export class User {
  private uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  constructor(uid: string, email: string, firstName: string, lastName: string, role: UserRole = UserRole.DEVELOPER) {
    this.uid = uid;
    this.role = role;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

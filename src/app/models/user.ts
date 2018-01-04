import { UserRole } from '../enums/user-role.enum';

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone: string;
  // tslint:disable-next-line:max-line-length
  constructor(uid: string, email: string, firstName: string, lastName: string, role: UserRole = UserRole.DEVELOPER, phone: string = '000000000') {
    this.id = uid;
    this.role = role;
    this.phone = phone;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

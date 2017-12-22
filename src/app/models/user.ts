export class User {
  private uid: string;
  public email: string;
  private firstName: string;
  private lastName: string;
  password: string;
  constructor(uid: string, email: string, firstName: string, lastName: string) {
    this.uid = uid;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

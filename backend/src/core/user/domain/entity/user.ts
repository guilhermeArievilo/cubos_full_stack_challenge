import { Replace } from "@/shared/helpers/Replace";
import { ObjectId } from "bson";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


export default class User {
  private _id: string;
  private props: UserProps;

  public constructor(props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date; }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id ?? this.generateId();
  }

  private generateId(): string {
    return new ObjectId().toHexString();
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }

  toJSON() {
    const { password, ...user } = this.props;
    return user;
  }
}
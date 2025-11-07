import { Replace } from "@/shared/helpers/Replace";
import { ObjectId } from "bson";

export type RefreshTokenProps = {
  tokenHash: string;
  expiresIn: Date;
  userId: string;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default class RefreshToken {
  private _id: string;
  private props: RefreshTokenProps;
  
  public constructor(
    props: Replace<RefreshTokenProps, { createdAt?: Date; updatedAt?: Date; }>,
    id?: string
  ) {
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
  
  get tokenHash(): string {
    return this.props.tokenHash;
  }

  set tokenHash(tokenHash: string) {
    this.props.tokenHash = tokenHash;
  }

  get expiresIn(): Date {
    return this.props.expiresIn;
  }

  set expiresIn(expiresIn: Date) {
    this.props.expiresIn = expiresIn;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get revoked(): boolean {
    return this.props.revoked;
  }

  set revoked(revoked: boolean) {
    this.props.revoked = revoked;
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
    return {
      id: this._id,
      ...this.props,
    };
  }
}
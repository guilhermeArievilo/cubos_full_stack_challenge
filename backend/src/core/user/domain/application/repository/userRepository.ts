import User from "../../entity/user";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
  name?: string;
  email?: string;
};

export default abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(data: CreateUserDTO): Promise<User>;
}
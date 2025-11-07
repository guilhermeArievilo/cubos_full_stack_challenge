import { Injectable, Res } from "@nestjs/common";
import User from "../../entity/user";
import UserRepository, { CreateUserDTO } from "../repository/userRepository";
import * as bcrypt from "bcrypt";
import { ResourceAlreadyExistError } from "@/shared/exceptions/resourceAlreadyExistError";

@Injectable()
export default class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const { name, email, password } = data;

    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) throw new ResourceAlreadyExistError({
      resource: "User",
      field: "Email"
    });

    const hashPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.create({
      name, email, password: hashPassword
    });
  }
}
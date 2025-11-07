import { Injectable } from "@nestjs/common";
import User from "../../entity/user";
import UserRepository from "../repository/userRepository";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";
import ResourceNotFoundError from "@/shared/exceptions/resourceNotFoundError";

@Injectable()
export default class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    if (!email) throw new RequiredFieldError("Email");

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ResourceNotFoundError("User");

    return user;
  }
}
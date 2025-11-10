import { Injectable } from "@nestjs/common";
import EmailRepository from "../repository/emailRepository";
import { EmailContent } from "../../entities/emailContent";
import RequiredFieldError from "@/shared/exceptions/requiredFieldError";

@Injectable()
export default class SendEmailUseCase {
  constructor(
    private emailRepository: EmailRepository
  ) {}

  async execute(to: string[], content: EmailContent): Promise<void> {

    if (!to.length) {
      throw new RequiredFieldError("to");
    }

    if (!content) throw new RequiredFieldError("content");

    return await this.emailRepository.sendEmail(to, content);
  }
}

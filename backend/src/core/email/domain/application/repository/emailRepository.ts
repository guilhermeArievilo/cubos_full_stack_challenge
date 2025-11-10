import { EmailContent } from "../../entities/emailContent";

export default abstract class EmailRepository {
  abstract sendEmail(to: string[], content: EmailContent): Promise<void>
}

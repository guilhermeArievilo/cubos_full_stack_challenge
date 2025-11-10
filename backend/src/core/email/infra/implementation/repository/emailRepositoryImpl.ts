import EmailRepository from "@/core/email/domain/application/repository/emailRepository";
import { Injectable, Logger } from "@nestjs/common";
import { EmailContent } from "@/core/email/domain/entities/emailContent";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import AwsSESService from "../../aws/awsSES.service";

@Injectable()
export default class EmailRepositoryImpl implements EmailRepository {
  private readonly logger = new Logger(EmailRepositoryImpl.name);
  constructor(private readonly awsService: AwsSESService) {}
  
  async sendEmail(to: string[], { content, subject }: EmailContent): Promise<void> {
    const params = {
      Source: process.env.SES_SENDER_EMAIL!,
      Destination: { ToAddresses: to },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: { Data: content },
        },
      },
    };

    try {
      await this.awsService.client.send(new SendEmailCommand(params));
      this.logger.log(`Send email to: ${to}`);
    } catch (err) {
      this.logger.error(`Error to send email: ${err.message}`);
    }
  }
}
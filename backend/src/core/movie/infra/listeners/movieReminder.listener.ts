import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SchedulerRegistry } from "@nestjs/schedule";
import { type MovieEvent } from "../../domain/entities/movieEvent";
import SendEmailUseCase from "@/core/email/domain/application/use-cases/sendEmailUsecase";


@Injectable()
export default class MovieReminderListener {
  private readonly logger = new Logger(MovieReminderListener.name);

  constructor(
    private readonly schedulerRegister: SchedulerRegistry,
    private readonly sendEmailUseCase: SendEmailUseCase
  ) {}

  @OnEvent('movie.scheduled')
  handleMovieScheduled(event: MovieEvent) {
    const delay = new Date(event.movie.releaseDate).getTime() - new Date().getTime();

    if (delay <= 0) return;

    const timeout = setTimeout(async () => {
      this.logger.log(`Send reminder for ${event.to[0]}`);

      await this.sendEmailUseCase.execute(event.to, {
        subject: `Lançamento: ${event.movie.title}`,
        content: `${event.movie.title} Estreia hoje! 🍿`,
        htmlContent: `<h1>${event.movie.title}</h1><p>Estreia hoje! 🍿</p>`
      })
    }, delay);

    this.schedulerRegister.addTimeout(`movie-${event.movie.slug}`, timeout);
  }
}
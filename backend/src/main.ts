import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DomainExceptionFilter } from './shared/exceptions/filter/domainException.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const frontendClient = process.env.CLIENT_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => errors,
  }));
  app.useGlobalFilters(new DomainExceptionFilter())

  app.enableCors({
    origin: [frontendClient],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('Cubos Movie API')
    .setDescription('Documentação da API de filmes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Swagger disponível em: http://localhost:3000/docs`);
}
bootstrap();

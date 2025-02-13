import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // All routes will be prefixed with /api
  app.enableCors({exposedHeaders: ['x-user-icon','x-user-count']}); // Enable CORS for frontend communication // adding headers to see on browser
  app.useLogger(['log', 'error', 'warn', 'debug']);
  await app.listen(process.env.PORT ?? 3006);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

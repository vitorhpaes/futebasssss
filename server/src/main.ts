import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS
  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:5173'], // Origens permitidas
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Configurar prefixo global para todas as rotas
  app.setGlobalPrefix('api');

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Futebasssss API')
    .setDescription('API para o sistema Futebasssss')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

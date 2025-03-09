import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS - aceitar todas as origens durante desenvolvimento
  app.enableCors({
    origin: true, // Aceita requisições de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configurar prefixo global para todas as rotas API
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Futebasssss API')
    .setDescription('API para o sistema Futebasssss')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth() // Adiciona autenticação Bearer para o Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Configurar Swagger em /docs em vez de /api para evitar conflitos
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

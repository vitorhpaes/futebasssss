import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

// Variável para armazenar o documento Swagger
let swaggerDocument: OpenAPIObject;

// Função para obter o documento Swagger (será usada pelo script no package.json)
export function getSwaggerDocument(): OpenAPIObject {
  return swaggerDocument;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5000',
      'http://127.0.0.1:5000',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    maxAge: 86400, // 24 horas em segundos
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Futebasssss API')
    .setDescription('API para o sistema Futebasssss')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  swaggerDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

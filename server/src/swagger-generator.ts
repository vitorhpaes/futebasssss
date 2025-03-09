import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generateSwaggerDoc() {
  // Cria uma aplicação NestJS apenas para gerar o documento Swagger
  const app = await NestFactory.create(AppModule);

  // Configura o Swagger da mesma forma que no main.ts
  const config = new DocumentBuilder()
    .setTitle('Futebasssss API')
    .setDescription('API para o sistema Futebasssss')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  // Cria o documento Swagger
  const document = SwaggerModule.createDocument(app, config);

  // Define o caminho onde o arquivo swagger.json será salvo
  const outputPath = path.resolve(process.cwd(), 'swagger.json');

  // Salva o documento como um arquivo JSON
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });

  console.log(`Swagger JSON gerado com sucesso em: ${outputPath}`);

  // Fecha a aplicação NestJS
  await app.close();
}

// Executa a função
generateSwaggerDoc()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Erro ao gerar o Swagger JSON:', error);
    process.exit(1);
  });

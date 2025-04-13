/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

type MiddlewareParams = Parameters<Parameters<PrismaClient['$use']>[0]>[0];

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    this.$use(async (params: MiddlewareParams, next) => {
      // Lista de modelos que suportam exclusão lógica
      const modelsWithSoftDelete = [
        'User',
        'Session',
        'Team',
        'PlayerSession',
        'GameResult',
        'PlayerFavorite',
      ];

      // Verifica se o modelo atual suporta exclusão lógica
      if (!params.model || !modelsWithSoftDelete.includes(params.model)) {
        return next(params);
      }

      // Gerencia a exclusão lógica
      if (params.action === 'delete') {
        // Altera a ação de delete para update
        params.action = 'update';
        // Usamos o nome da propriedade camelCase para o campo TypeScript
        params.args.data = { deletedAt: new Date() };
      }

      if (params.action === 'deleteMany') {
        // Altera a ação de deleteMany para updateMany
        params.action = 'updateMany';
        if (params.args.data) {
          params.args.data.deletedAt = new Date();
        } else {
          params.args.data = { deletedAt: new Date() };
        }
      }

      // Filtra registros não excluídos em operações de find
      if (['findUnique', 'findFirst', 'findMany'].includes(params.action)) {
        // Adiciona filtro de deletedAt para dados não excluídos logicamente
        if (params.args.where) {
          if (params.args.where.deletedAt === undefined) {
            params.args.where.deletedAt = null;
          }
        } else {
          params.args.where = { deletedAt: null };
        }
      }

      return next(params);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}

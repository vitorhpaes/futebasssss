import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Season } from '@prisma/client';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Season[]> {
    try {
      return await this.prisma.season.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao buscar resultados de jogos');
    }
  }

  async findOne(id: number): Promise<Season> {
    try {
      const season = await this.prisma.season.findUnique({
        where: { id },
      });

      if (!season) {
        throw new NotFoundException(
          `Resultado de jogo com ID ${id} não encontrado`,
        );
      }

      return season;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao buscar temporada ${id}`);
    }
  }

  async create(data: CreateSeasonDto): Promise<Season> {
    try {
      return await this.prisma.season.create({
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao criar resultado de jogo');
    }
  }

  async update(id: number, data: UpdateSeasonDto): Promise<Season> {
    try {
      const season = await this.prisma.season.update({
        where: { id },
        data: data,
      });

      return season;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao atualizar resultado de jogo ${id}`);
    }
  }

  async remove(id: number): Promise<Season> {
    try {
      const seasonResult = await this.prisma.season.findUnique({
        where: { id },
      });

      if (!seasonResult) {
        throw new NotFoundException(
          `Resultado de jogo com ID ${id} não encontrado`,
        );
      }

      return await this.prisma.season.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao remover resultado de jogo ${id}`);
    }
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerFavorite } from '@prisma/client';
import { CreatePlayerFavoriteDto } from './dto/create-player-favorite.dto';

export interface MostFavoritedPlayer {
  player: {
    id: number;
    name: string;
    email: string;
    position: string;
  };
  favoriteCount: number;
}

@Injectable()
export class PlayerFavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PlayerFavorite[]> {
    try {
      return await this.prisma.playerFavorite.findMany({
        include: {
          session: true,
          voter: true,
          favorite: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao buscar favoritos');
    }
  }

  async findBySessionId(sessionId: number): Promise<PlayerFavorite[]> {
    try {
      return await this.prisma.playerFavorite.findMany({
        where: { sessionId },
        include: {
          voter: true,
          favorite: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao buscar favoritos para a sessão ${sessionId}`);
    }
  }

  async findByVoterId(voterId: number): Promise<PlayerFavorite[]> {
    try {
      return await this.prisma.playerFavorite.findMany({
        where: { voterId },
        include: {
          session: true,
          favorite: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao buscar favoritos do votante ${voterId}`);
    }
  }

  async findByFavoriteId(favoriteId: number): Promise<PlayerFavorite[]> {
    try {
      return await this.prisma.playerFavorite.findMany({
        where: { favoriteId },
        include: {
          session: true,
          voter: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao buscar favoritos para o jogador ${favoriteId}`);
    }
  }

  async create(data: CreatePlayerFavoriteDto): Promise<PlayerFavorite> {
    try {
      const { sessionId, voterId, favoriteId } = data;

      // Verificar se o jogador já foi favoritado pelo mesmo votante nesta sessão
      const existing = await this.prisma.playerFavorite.findFirst({
        where: {
          sessionId,
          voterId,
          favoriteId,
        },
      });

      if (existing) {
        return existing;
      }

      // Verificar quantos favoritos o votante já adicionou neste time para esta sessão
      const countVoterFavorites = await this.prisma.playerFavorite.count({
        where: {
          voterId,
          sessionId,
        },
      });

      if (countVoterFavorites >= 5) {
        throw new BadRequestException(
          'Limite de 5 favoritos por time atingido',
        );
      }

      return await this.prisma.playerFavorite.create({
        data: {
          sessionId,
          voterId,
          favoriteId,
        },
        include: {
          session: true,
          voter: true,
          favorite: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao criar favorito');
    }
  }

  async remove(id: number): Promise<PlayerFavorite> {
    try {
      const favorite = await this.prisma.playerFavorite.findUnique({
        where: { id },
      });

      if (!favorite) {
        throw new NotFoundException(`Favorito com ID ${id} não encontrado`);
      }

      return await this.prisma.playerFavorite.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao remover favorito ${id}`);
    }
  }

  async getMostFavoritedPlayers(limit = 10): Promise<MostFavoritedPlayer[]> {
    try {
      const favorites = await this.prisma.playerFavorite.groupBy({
        by: ['favoriteId'],
        _count: {
          favoriteId: true,
        },
        orderBy: {
          _count: {
            favoriteId: 'desc',
          },
        },
        take: limit,
      });

      // Enriquecer os resultados com os dados dos jogadores
      const result: MostFavoritedPlayer[] = [];

      for (const fav of favorites) {
        const player = await this.prisma.user.findUnique({
          where: { id: fav.favoriteId },
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
          },
        });

        if (player) {
          result.push({
            player,
            favoriteCount: fav._count.favoriteId,
          });
        }
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao buscar jogadores mais favoritados');
    }
  }
}

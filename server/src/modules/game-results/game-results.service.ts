import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GameResult, Prisma } from '@prisma/client';
import { CreateGameResultDto } from './dto/create-game-result.dto';
import { UpdateGameResultDto } from './dto/update-game-result.dto';

@Injectable()
export class GameResultsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GameResult[]> {
    try {
      return await this.prisma.gameResult.findMany({
        include: {
          session: true,
          teamA: true,
          teamB: true,
          winnerTeam: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao buscar resultados de jogos');
    }
  }

  async findOne(id: number): Promise<GameResult> {
    try {
      const gameResult = await this.prisma.gameResult.findUnique({
        where: { id },
        include: {
          session: true,
          teamA: true,
          teamB: true,
          winnerTeam: true,
        },
      });

      if (!gameResult) {
        throw new NotFoundException(
          `Resultado de jogo com ID ${id} não encontrado`,
        );
      }

      return gameResult;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao buscar resultado de jogo ${id}`);
    }
  }

  async findBySessionId(sessionId: number): Promise<GameResult> {
    try {
      const gameResult = await this.prisma.gameResult.findUnique({
        where: { sessionId },
        include: {
          teamA: true,
          teamB: true,
          winnerTeam: true,
        },
      });

      if (!gameResult) {
        throw new NotFoundException(
          `Resultado de jogo para sessão ${sessionId} não encontrado`,
        );
      }

      return gameResult;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        `Erro ao buscar resultado de jogo para sessão ${sessionId}`,
      );
    }
  }

  async create(data: CreateGameResultDto): Promise<GameResult> {
    try {
      const { sessionId, teamAId, teamBId, scoreA, scoreB, winnerId } = data;

      // Determinar o vencedor com base nos scores se não for fornecido
      let calculatedWinnerId = winnerId;
      if (calculatedWinnerId === undefined) {
        if (scoreA > scoreB) {
          calculatedWinnerId = teamAId;
        } else if (scoreB > scoreA) {
          calculatedWinnerId = teamBId;
        }
        // Em caso de empate, winnerId permanece undefined
      }

      return await this.prisma.gameResult.create({
        data: {
          session: { connect: { id: sessionId } },
          teamA: { connect: { id: teamAId } },
          teamB: { connect: { id: teamBId } },
          teamAScore: scoreA,
          teamBScore: scoreB,
          winnerTeam: calculatedWinnerId
            ? { connect: { id: calculatedWinnerId } }
            : undefined,
        },
        include: {
          session: true,
          teamA: true,
          teamB: true,
          winnerTeam: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao criar resultado de jogo');
    }
  }

  async update(id: number, data: UpdateGameResultDto): Promise<GameResult> {
    try {
      const updateData: Prisma.GameResultUpdateInput = {};

      if (data.scoreA !== undefined) {
        updateData.teamAScore = data.scoreA;
      }

      if (data.scoreB !== undefined) {
        updateData.teamBScore = data.scoreB;
      }

      // Se o winnerId for fornecido, usamos ele diretamente
      if (data.winnerId !== undefined) {
        updateData.winnerTeam = data.winnerId
          ? { connect: { id: data.winnerId } }
          : { disconnect: true };
      }
      // Se não for fornecido, mas temos os scores, podemos calcular o vencedor
      else if (data.scoreA !== undefined && data.scoreB !== undefined) {
        const gameResult = await this.prisma.gameResult.findUnique({
          where: { id },
          include: { teamA: true, teamB: true },
        });

        if (gameResult) {
          if (data.scoreA > data.scoreB) {
            updateData.winnerTeam = { connect: { id: gameResult.teamAId } };
          } else if (data.scoreB > data.scoreA) {
            updateData.winnerTeam = { connect: { id: gameResult.teamBId } };
          } else {
            updateData.winnerTeam = { disconnect: true };
          }
        }
      }

      const gameResult = await this.prisma.gameResult.update({
        where: { id },
        data: updateData,
        include: {
          session: true,
          teamA: true,
          teamB: true,
          winnerTeam: true,
        },
      });

      if (!gameResult) {
        throw new NotFoundException(
          `Resultado de jogo com ID ${id} não encontrado`,
        );
      }

      return gameResult;
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

  async remove(id: number): Promise<GameResult> {
    try {
      const gameResult = await this.prisma.gameResult.findUnique({
        where: { id },
      });

      if (!gameResult) {
        throw new NotFoundException(
          `Resultado de jogo com ID ${id} não encontrado`,
        );
      }

      return await this.prisma.gameResult.delete({
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

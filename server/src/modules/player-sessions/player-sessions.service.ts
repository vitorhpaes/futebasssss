import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { PlayerSession, Prisma } from '@prisma/client';
import { CreatePlayerSessionDto } from './dto/create-player-session.dto';
import { UpdatePlayerSessionDto } from './dto/update-player-session.dto';

@Injectable()
export class PlayerSessionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PlayerSession[]> {
    return await this.prisma.playerSession.findMany({
      include: {
        user: true,
        session: true,
        team: true,
      },
    });
  }

  async findOne(id: number): Promise<PlayerSession | null> {
    return await this.prisma.playerSession.findUnique({
      where: { id },
      include: {
        user: true,
        session: true,
        team: true,
      },
    });
  }

  async findBySessionId(sessionId: number): Promise<PlayerSession[]> {
    return await this.prisma.playerSession.findMany({
      where: { sessionId },
      include: {
        user: true,
        team: true,
      },
    });
  }

  async findByUserId(userId: number): Promise<PlayerSession[]> {
    return await this.prisma.playerSession.findMany({
      where: { userId },
      include: {
        session: true,
        team: true,
      },
    });
  }

  async create(data: CreatePlayerSessionDto): Promise<PlayerSession> {
    const { userId, sessionId, teamId, confirmed, goals, assists } = data;

    // Verificar se já existe uma associação entre este usuário e esta sessão
    const existing = await this.prisma.playerSession.findFirst({
      where: {
        userId,
        sessionId,
      },
    });

    if (existing) {
      return await this.prisma.playerSession.update({
        where: { id: existing.id },
        data: {
          teamId,
          confirmed: confirmed ?? existing.confirmed,
          goals: goals ?? existing.goals,
          assists: assists ?? existing.assists,
        },
      });
    }

    return await this.prisma.playerSession.create({
      data: {
        userId,
        sessionId,
        teamId,
        confirmed: confirmed ?? false,
        goals: goals ?? 0,
        assists: assists ?? 0,
      },
    });
  }

  async update(
    id: number,
    data: UpdatePlayerSessionDto,
  ): Promise<PlayerSession> {
    const updateData: Prisma.PlayerSessionUpdateInput = {};

    if (data.teamId !== undefined) {
      updateData.team = { connect: { id: data.teamId } };
    }

    if (data.confirmed !== undefined) {
      updateData.confirmed = data.confirmed;
    }

    if (data.goals !== undefined) {
      updateData.goals = data.goals;
    }

    if (data.assists !== undefined) {
      updateData.assists = data.assists;
    }

    return await this.prisma.playerSession.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<PlayerSession> {
    return await this.prisma.playerSession.delete({
      where: { id },
    });
  }

  async confirmPresence(
    userId: number,
    sessionId: number,
  ): Promise<PlayerSession> {
    const playerSession = await this.prisma.playerSession.findFirst({
      where: {
        userId,
        sessionId,
      },
    });

    if (!playerSession) {
      throw new Error('Associação entre jogador e sessão não encontrada');
    }

    return await this.prisma.playerSession.update({
      where: { id: playerSession.id },
      data: {
        confirmed: true,
      },
    });
  }

  async updateStats(
    id: number,
    goals: number,
    assists: number,
  ): Promise<PlayerSession> {
    return await this.prisma.playerSession.update({
      where: { id },
      data: {
        goals,
        assists,
      },
    });
  }
}

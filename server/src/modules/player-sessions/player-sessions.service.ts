import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { PlayerSession, Prisma } from '@prisma/client';
import { CreatePlayerSessionDto } from './dto/create-player-session.dto';
import { UpdatePlayerSessionDto } from './dto/update-player-session.dto';

@Injectable()
export class PlayerSessionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(includeDeleted = false): Promise<PlayerSession[]> {
    return await this.prisma.playerSession.findMany({
      where: {
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      include: {
        user: true,
        session: true,
        team: true,
      },
    });
  }

  async findOne(id: number, includeDeleted = false): Promise<PlayerSession | null> {
    return await this.prisma.playerSession.findFirst({
      where: { 
        id,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      include: {
        user: true,
        session: true,
        team: true,
      },
    });
  }

  async findBySessionId(sessionId: number, includeDeleted = false): Promise<PlayerSession[]> {
    return await this.prisma.playerSession.findMany({
      where: { 
        sessionId,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      include: {
        user: true,
        team: true,
      },
    });
  }

  async findByUserId(userId: number, includeDeleted = false): Promise<PlayerSession[]> {
    return await this.prisma.playerSession.findMany({
      where: { 
        userId,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      include: {
        session: true,
        team: true,
      },
    });
  }

  async create(data: CreatePlayerSessionDto): Promise<PlayerSession> {
    const createData: Prisma.PlayerSessionCreateInput = {
      user: {
        connect: { id: data.userId },
      },
      session: {
        connect: { id: data.sessionId },
      },
      confirmed: data.confirmed || false,
      goals: data.goals || 0,
      assists: data.assists || 0,
      willPlay: data.willPlay ?? true,
    };

    if (data.teamId) {
      createData.team = {
        connect: { id: data.teamId },
      };
    }

    return await this.prisma.playerSession.create({
      data: createData,
      include: {
        user: true,
        session: true,
        team: true,
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

    if (data.willPlay !== undefined) {
      updateData.willPlay = data.willPlay;
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

  async findDeleted(): Promise<PlayerSession[]> {
    try {
      const playerSessions = await this.prisma.$queryRaw<PlayerSession[]>`
        SELECT id, confirmed, goals, assists, created_at as "createdAt", 
        updated_at as "updatedAt", user_id as "userId", session_id as "sessionId", 
        team_id as "teamId", will_play as "willPlay", deleted_at as "deletedAt"
        FROM player_sessions 
        WHERE deleted_at IS NOT NULL
      `;
      return playerSessions;
    } catch (error) {
      console.error('Erro ao buscar associações excluídas:', error);
      return [];
    }
  }

  async restore(id: number): Promise<PlayerSession> {
    return await this.prisma.playerSession.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }

  async permanentDelete(id: number): Promise<PlayerSession> {
    return await this.prisma.$transaction(async (prisma) => {
      // Busca a associação antes da exclusão permanente
      const playerSession = await prisma.playerSession.findFirst({
        where: { id },
      });

      // Realiza a exclusão permanente, ignorando o middleware de exclusão lógica
      await prisma.$executeRaw`
        DELETE FROM player_sessions WHERE id = ${id}
      `;

      return playerSession;
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

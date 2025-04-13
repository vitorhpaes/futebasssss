import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { Prisma, Team } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(includeDeleted = false): Promise<Team[]> {
    return await this.prisma.team.findMany({
      where: {
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
    });
  }

  async findOne(id: number, includeDeleted = false): Promise<Team | null> {
    const where: Prisma.TeamWhereInput = { id };
    if (!includeDeleted) {
      where.deletedAt = null;
    }

    return await this.prisma.team.findFirst({
      where,
    });
  }

  async create(data: CreateTeamDto): Promise<Team> {
    return await this.prisma.team.create({
      data,
    });
  }

  async update(id: number, data: UpdateTeamDto): Promise<Team> {
    return await this.prisma.team.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Team> {
    return await this.prisma.team.delete({
      where: { id },
    });
  }

  async findDeleted(): Promise<Team[]> {
    try {
      const teams = await this.prisma.$queryRaw<Team[]>`
        SELECT id, name, color, session_id as "sessionId", created_at as "createdAt", 
        updated_at as "updatedAt", deleted_at as "deletedAt" 
        FROM teams 
        WHERE deleted_at IS NOT NULL
      `;
      return teams;
    } catch (error) {
      console.error('Erro ao buscar times excluídos:', error);
      return [];
    }
  }

  async restore(id: number): Promise<Team> {
    return await this.prisma.team.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }

  async permanentDelete(id: number): Promise<Team> {
    return await this.prisma.$transaction(async (prisma) => {
      // Busca o time antes da exclusão permanente
      const team = await prisma.team.findFirst({
        where: { id },
      });

      // Realiza a exclusão permanente, ignorando o middleware de exclusão lógica
      await prisma.$executeRaw`
        DELETE FROM teams WHERE id = ${id}
      `;

      return team;
    });
  }

  async getTeamPlayers(
    id: number,
    sessionId?: number,
  ): Promise<
    {
      id: number;
      name: string | null;
      position: string | null;
      goals: number;
      assists: number;
      confirmed: boolean;
    }[]
  > {
    const playerSessions = await this.prisma.playerSession.findMany({
      where: { teamId: id, ...(sessionId && { sessionId }) },
      include: {
        user: true,
      },
    });

    return playerSessions.map((ps) => ({
      id: ps.user.id,
      name: ps.user.name,
      position: ps.user.position,
      goals: ps.goals,
      assists: ps.assists,
      confirmed: ps.confirmed,
    }));
  }

  async updateCaptain(teamId: number, playerSessionId: number) {
    // Verifica se o time existe
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        playerSessions: true,
      },
    });

    if (!team) {
      throw new Error('Time não encontrado');
    }

    // Verifica se o jogador faz parte do time
    const isPlayerInTeam = team.playerSessions.some(
      (player) => player.id === playerSessionId,
    );

    if (!isPlayerInTeam) {
      throw new Error('Jogador não faz parte deste time');
    }

    const player = await this.prisma.playerSession
      .findUniqueOrThrow({
        where: { id: playerSessionId },
        include: {
          user: true,
        },
      })
      .catch(() => {
        throw new NotFoundException('Jogador não encontrado');
      });

    return this.prisma.team.update({
      where: { id: teamId },
      data: {
        captainId: playerSessionId,
        name: `Time ${player.user.name.split(' ')[0]}`,
      },
      include: {
        captain: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}

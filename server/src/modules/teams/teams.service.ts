import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { Team } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(includeDeleted = false): Promise<Team[]> {
    return await this.prisma.team.findMany({
      where: {
        ...(includeDeleted ? {} : { deletedAt: null }),
      }
    });
  }

  async findOne(id: number, includeDeleted = false): Promise<Team | null> {
    const where: any = { id };
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
}

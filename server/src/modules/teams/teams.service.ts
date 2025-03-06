import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { Team, Prisma } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Team[]> {
    return await this.prisma.team.findMany();
  }

  async findOne(id: number): Promise<Team | null> {
    return await this.prisma.team.findUnique({
      where: { id },
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

  async getTeamPlayers(id: number, sessionId?: number) {
    const query: Prisma.PlayerSessionFindManyArgs = {
      where: { teamId: id, ...(sessionId && { sessionId }) },
      include: {
        user: true,
      },
    };

    const playerSessions = await this.prisma.playerSession.findMany(query);

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

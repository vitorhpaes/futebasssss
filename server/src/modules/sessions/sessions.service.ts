import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { Session, Prisma, SessionStatus } from '@prisma/client';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Session[]> {
    return await this.prisma.session.findMany({
      include: {
        playerSessions: true,
        gameResult: true,
      },
    });
  }

  async findOne(id: number): Promise<Session | null> {
    return await this.prisma.session.findUnique({
      where: { id },
      include: {
        playerSessions: true,
        gameResult: true,
      },
    });
  }

  async create(data: CreateSessionDto): Promise<Session> {
    const { date, location, status, notes } = data;

    return await this.prisma.session.create({
      data: {
        date: new Date(date),
        location,
        status: status as SessionStatus,
        notes,
      },
    });
  }

  async update(id: number, data: UpdateSessionDto): Promise<Session> {
    const updateData: Prisma.SessionUpdateInput = {};

    if (data.date) {
      updateData.date = new Date(data.date);
    }

    if (data.location) {
      updateData.location = data.location;
    }

    if (data.status) {
      updateData.status = data.status as SessionStatus;
    }

    if (data.notes !== undefined) {
      updateData.notes = data.notes;
    }

    return await this.prisma.session.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<Session> {
    return await this.prisma.session.delete({
      where: { id },
    });
  }

  async findUpcoming(): Promise<Session[]> {
    return await this.prisma.session.findMany({
      where: {
        date: {
          gte: new Date(),
        },
        status: SessionStatus.SCHEDULED,
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        playerSessions: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findPast(): Promise<Session[]> {
    return await this.prisma.session.findMany({
      where: {
        date: {
          lt: new Date(),
        },
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        playerSessions: {
          include: {
            user: true,
          },
        },
        gameResult: {
          include: {
            teamA: true,
            teamB: true,
          },
        },
      },
    });
  }
}

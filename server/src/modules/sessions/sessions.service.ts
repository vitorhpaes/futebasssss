import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { Session, Prisma, SessionStatus } from '@prisma/client';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(includeDeleted = false): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: {
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      include: {
        playerSessions: true,
        teams: true,
      },
    });
  }

  async findOne(id: number, includeDeleted = false): Promise<Session | null> {
    return this.prisma.session.findFirst({
      where: {
        id,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      include: {
        playerSessions: true,
        teams: {
          orderBy: {
            captain: {
              user: {
                name: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async create(data: CreateSessionDto): Promise<Session> {
    const { date, location, status, notes } = data;

    return this.prisma.session.create({
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

    return this.prisma.session.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<Session> {
    return this.prisma.session.delete({
      where: { id },
    });
  }

  async findUpcoming(includeDeleted = false): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: {
        date: {
          gte: new Date(),
        },
        status: SessionStatus.SCHEDULED,
        ...(includeDeleted ? {} : { deletedAt: null }),
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

  async findPast(includeDeleted = false): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: {
        date: {
          lt: new Date(),
        },
        ...(includeDeleted ? {} : { deletedAt: null }),
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
      },
    });
  }

  async findDeleted(): Promise<Session[]> {
    return this.prisma.$queryRaw`
      SELECT * FROM sessions 
      WHERE deleted_at IS NOT NULL
      ORDER BY date DESC
    `;
  }

  async restore(id: number): Promise<Session> {
    return this.prisma.session.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }

  async permanentDelete(id: number): Promise<Session> {
    return this.prisma.$transaction(async (prisma) => {
      const session = await prisma.session.findFirst({
        where: { id },
      });

      await prisma.$executeRaw`
        DELETE FROM sessions WHERE id = ${id}
      `;

      return session;
    });
  }

  async updateStatus(id: number, status: SessionStatus): Promise<Session> {
    return this.prisma.session.update({
      where: { id },
      data: { status },
    });
  }

  async findLastSession() {
    const lastSession = await this.prisma.session.findFirst({
      where: {
        deletedAt: null,
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        teams: {
          select: {
            id: true,
            name: true,
          },
        },
        playerSessions: {
          where: {
            willPlay: true,
          },
          include: {
            user: true,
          },
        },
      },
    });

    const lastSessionFavorites = await this.prisma.playerFavorite.findMany({
      where: {
        sessionId: lastSession.id,
      },
    });

    const lastSessionWithFavoritesCount = {
      ...lastSession,
      playerSessions: lastSession.playerSessions
        .map((playerSession) => ({
          ...playerSession,
          favoritesCount: lastSessionFavorites.filter(
            (favorite) => favorite.favoriteId === playerSession.userId,
          ).length,
        }))
        .sort((a, b) => {
          if (a.favoritesCount > b.favoritesCount) return -1;
          if (a.favoritesCount < b.favoritesCount) return 1;
          return 0;
        }),
    };

    return lastSessionWithFavoritesCount;
  }
}

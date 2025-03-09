import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { User, Prisma, UserType, Position } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findPlayers(
    name?: string,
    position?: Position,
    orderBy?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
  ): Promise<User[]> {
    const validOrderFields = ['name', 'position'];
    const orderField = validOrderFields.includes(orderBy) ? orderBy : 'name';

    return await this.prisma.user.findMany({
      where: {
        type: UserType.PLAYER,
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(position && { position }),
      },
      orderBy: {
        [orderField]: orderDirection,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    // Se a senha não estiver criptografada, criptografa
    if (data.password && !data.password.startsWith('$2b$')) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    // Se a senha estiver sendo atualizada e não estiver criptografada, criptografa
    if (
      typeof data.password === 'string' &&
      !data.password.startsWith('$2b$')
    ) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

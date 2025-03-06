import { Prisma } from '@prisma/client';

// Tipos para o modelo User
export type UserWithoutPassword = Omit<Prisma.UserGetPayload<{}>, 'password'>;
export type UserPayload = Prisma.UserGetPayload<{}>;

// Tipos para as operações do Prisma
export type PrismaUser = {
  findMany: () => Promise<UserPayload[]>;
  findUnique: (args: { where: { id: number } }) => Promise<UserPayload | null>;
  create: (args: { data: Prisma.UserCreateInput }) => Promise<UserPayload>;
  update: (args: {
    where: { id: number };
    data: Prisma.UserUpdateInput;
  }) => Promise<UserPayload>;
  delete: (args: { where: { id: number } }) => Promise<UserPayload>;
};

// Tipo para o PrismaService
export type PrismaServiceType = {
  user: PrismaUser;
};

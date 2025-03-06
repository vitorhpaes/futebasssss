import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

type UserWithoutPassword = {
  id: number;
  email: string;
  name: string | null;
  type: 'PLAYER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result as UserWithoutPassword;
    }
    return null;
  }

  login(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id, type: user.type };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type,
      },
    };
  }

  async register(
    email: string,
    password: string,
    name?: string,
    type?: 'PLAYER' | 'ADMIN',
  ): Promise<UserWithoutPassword> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userType = type || 'PLAYER';

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
      type: userType,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result as UserWithoutPassword;
  }
}

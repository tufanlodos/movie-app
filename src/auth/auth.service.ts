import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, USER_MODEL_NAME, User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER_MODEL_NAME) private readonly user: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async comparePassword(password: string, hash) {
    return await bcrypt.compare(password, hash);
  }

  private async getUserByEmail(email: string) {
    return await this.user.findOne({ email });
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      age: user.age,
    };
    return this.jwtService.signAsync(payload);
  }

  async register(email: string, password: string, age: number, role: Role) {
    const user = await this.getUserByEmail(email);
    if (user) {
      throw new BadRequestException();
    }
    const newUser = await this.user.create({ email, password, age, role });
    newUser.password = await this.hashPassword(password);
    await newUser.save();
    return this.generateToken(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException();
    }
    const isPasswordCorrect = await this.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException();
    }

    return this.generateToken(user);
  }
}
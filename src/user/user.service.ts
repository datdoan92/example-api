import { FindOptionsWhere, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepo.findOneBy(where);
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user);
  }
}

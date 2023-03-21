import { BcryptService } from 'auth/bcrypt.service';
import { User } from 'user/user.entity';
import { UserService } from 'user/user.service';

import { BadRequestException, Injectable } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptSrv: BcryptService,
    private readonly userSrv: UserService) {}

  async register(body: RegisterDto) {
    const { email, username } = body;
    let user = await this.userSrv.findOneBy({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    user = await this.userSrv.findOneBy({ username });
    if (user) {
      throw new BadRequestException('Username already exists');
    }
    const hashedPassword = await this.bcryptSrv.hash(body.password);
    return this.userSrv.create(new User({ ...body, password: hashedPassword }));
  }
}

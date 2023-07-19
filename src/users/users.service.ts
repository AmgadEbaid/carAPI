import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(user)
    private usersRepository: Repository<user>,
  ) {}

  findone(Id: number) {
    if (!Id) return;

    const user = this.usersRepository.findOne({ where: { id: Id } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
  async find(email: string) {
    const user = await this.usersRepository.find({
      where: {
        email: email,
      },
    });
    return user;
  }
  async create(email, password) {
    let user = await this.usersRepository.create({ email, password });
    return this.usersRepository.save(user);
  }

  async updata(id: number, attrs: Partial<user>) {
    const user = await this.findone(id);
    if (!user) throw new NotFoundException('user not found');
    Object.assign(user, attrs);
    this.usersRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.findone(id);
    if (!user) throw new NotFoundException('user not found');

    return this.usersRepository.remove(user);
  }
}

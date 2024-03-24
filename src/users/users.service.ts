import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // private readonly users = [
  //   {
  //     id: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     id: 2,
  //     username: 'chris',
  //     password: 'secret',
  //   },
  // ];
  async create(createUserInput: CreateUserInput): Promise<User> {
    const users = await this.usersRepository.create(createUserInput);

    const user = Array.isArray(users) ? users[0] : users;
    await this.usersRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  async findAll(): Promise<User[]> {
    // return this.users;
    return await this.usersRepository.find();
  }

  async findOneByName(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username: username },
    });
  }
  async findOneById(id: number): Promise<any> {
    return this.usersRepository.findOne({ where: { id: id } });
  }
  // async update(id: number, createUserInput: CreateUserInput) {
  //   return await this.usersRepository.update(id, createUserInput);
  // }
}

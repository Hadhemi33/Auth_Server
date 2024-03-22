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

  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'chris',
      password: 'secret',
    },
  ];
  async create(createUserInput: CreateUserInput): Promise<User> {
    // const user = {
    //   ...createUserInput,
    //   id: this.users.length + 1,
    // };

    // this.users.push(user);
    // console.log(this.users);
    // return user;
    //
    const user = {
      ...createUserInput,
      id: this.users.length + 1,
    };

    return await this.usersRepository.create(user);
  }

  findAll() {
    // return this.users;
    return this.usersRepository.find();
  }

  async findOne(username: string) {
    return await this.users.find((user) => user.username === username);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Query(() => [User], { name: 'users' })
  // @UseGuards(JwtAuthGuard)
  // // findAll() {
  // //   return this.usersService.findAll();
  // // }
  // async findAll(): Promise<User[]> {
  //   return this.usersService.findOneByName();
  // }
  @Mutation(() => User)
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('username') username: string): Promise<any> {
    return this.usersService.findOneByName(username);
  }
}

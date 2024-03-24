import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupResponse } from './dto/signup-response';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const users = await this.usersService.findOneByName(username);
    const user = Array.isArray(users) ? users[0] : users; // Assuming you want the first user if there are multiple

    const valid = await bcrypt.compare(password, user?.password);
    // if (user && user.password === password) {
    if (user && valid) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      ...user,
    };
  }
  async signup(loginUserInput: LoginUserInput): Promise<SignupResponse> {
    const users = await this.usersService.findOneByName(
      loginUserInput.username,
    );

    const user = Array.isArray(users) ? users[0] : users;
    if (user) {
      throw new Error('User already exists');
    }
    const password = await bcrypt.hash(loginUserInput.password, 10);
    // return this.usersService.create({ ...loginUserInput, password });
    const newUser = await this.usersService.create({
      ...loginUserInput,
      password,
    });

    const access_token = this.jwtService.sign({
      username: newUser.username,
      sub: newUser.id,
    });

    return { access_token }; // Return the SignupResponse object
  }
}

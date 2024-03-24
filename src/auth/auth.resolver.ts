import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Any } from 'typeorm';
import { SignupResponse } from './dto/signup-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => LoginResponse)
  //protect user query with GqlAuthGuard
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
  // @Mutation(() => User)
  @Mutation(() => SignupResponse)
  async signup(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<SignupResponse> {
    return this.authService.signup(loginUserInput);
  }
}

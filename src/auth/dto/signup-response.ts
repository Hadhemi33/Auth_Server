import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignupResponse {
  @Field()
  access_token: string;
}

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { AddUserInput } from "../graphql/inputs";
import User from "../models/User";
import UserService from "../services/UserService";

@Service()
@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => User, { nullable: true })
  async me(): Promise<User | null> {
    return null;
  }

  @Mutation(() => User)
  async user(@Arg("payload") payload : AddUserInput) : Promise<User> {
    return this.userService.createUser(payload);
  }
}

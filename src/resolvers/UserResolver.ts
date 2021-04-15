import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { AddUserInput } from "../graphql/inputs";
import User from "../app/models/User";
import UserService from "../app/services/UserService";
import { AUTH_ROLES } from "../app/authorization/authRoles";

@Service()
@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {}
  
  @Authorized(AUTH_ROLES.USER_LOGGED)
  @Query(() => User, { nullable: true })
  async me(): Promise<User | null> {
    return null;
  }

  @Mutation(() => User)
  async createUser(@Arg("payload") payload : AddUserInput) : Promise<User> {
    return this.userService.createUser(payload);
  }
}

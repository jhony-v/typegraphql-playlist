import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
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
}

import { Service } from "typedi";
import User from "../app/models/User";
import UserService from "../app/services/UserService";
import { AUTH_ROLES } from "../app/authorization/authRoles";
import { AddUserInput, LoginInput } from "../graphql/inputs";
import JsonWebTokenService from "../app/services/JsonWebTokenService";
import PasswordVerifyService from "../app/services/PasswordVerifyService";
import { Arg, Authorized, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Auth from "../app/models/Auth";
import AuthLogin from "../app/models/AuthLogin";
import { ApolloError } from "apollo-server-errors";
import AuthorizedMiddleware from "../middlewares/Authorized.middleware";

@Service()
@Resolver()
export default class UserResolver {
   constructor(
      private readonly userService: UserService,
      private readonly jsonTokenService: JsonWebTokenService,
      private readonly passwordVerifiyService: PasswordVerifyService
   ) {}

   @UseMiddleware(AuthorizedMiddleware)
   @Query(() => User, { nullable: true })
   async me(): Promise<Partial<User> | null> {
      return { password : "ok" };
   }

   @Mutation(() => AuthLogin)
   async createUser(@Arg("user") payload: AddUserInput): Promise<AuthLogin> {
      const encryptedPassword = await this.passwordVerifiyService.hash(payload.password);
      return this.userService.createUser({
         ...payload,
         password: encryptedPassword,
      });
   }

   @Mutation(() => Auth)
   async login(@Arg("user") { username, password }: LoginInput): Promise<Auth> {
      const user = await this.userService.findUserByUsername(username);
      if (user) {
         const parseUser = {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            isPersonal: user.isPersonal,
         };
         const isCorrectPassword = await this.passwordVerifiyService.check(
            password,
            user.password
         );
         const token = await this.jsonTokenService.sign(parseUser);
         if (isCorrectPassword) {
            return {
               ...parseUser,
               token,
            };
         }
      }
      throw new ApolloError("user not found");
   }
}

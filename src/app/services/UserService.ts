import { Service } from "typedi";
import { Repository } from "typeorm";
import AuthLogin from "../models/AuthLogin";
import User from "../models/User";
import BaseService from "./BaseService";

@Service()
export default class UserService extends BaseService {
   private userRepository: Repository<User>;
   constructor() {
      super();
      this.userRepository = this.initializeModelRepository(User);
   }

   async createUser(params: {
      username: string;
      fullName: string;
      isPersonal: boolean;
      password: string;
      tags: string[];
   }): Promise<AuthLogin> {
      const user: User = new User();
      user.tags = params.tags;
      user.isPersonal = params.isPersonal;
      user.username = params.username;
      user.fullName = params.fullName;
      user.password = params.password;
      const result = await this.userRepository.save(user);
      return {
         id: result.id,
         createdAt: result.createdAt,
         fullName: result.fullName,
         username: result.username,
         tags: result.tags,
      };
   }

   async findUserByUsername(username : string) : Promise<User | null> {
      const result = await this.userRepository.findOne({
         where : {
            username
         }
      })
      return result || null;
   }
}

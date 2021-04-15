import { Service } from "typedi";
import { Repository } from "typeorm";
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
    tags: string[];
  }) : Promise<User> {
    const user: User = new User();
    user.tags = params.tags;
    user.isPersonal = params.isPersonal;
    user.username = params.username;
    user.fullName = params.fullName;
    return this.userRepository.save(user);
  }
}

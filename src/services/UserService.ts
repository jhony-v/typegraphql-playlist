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
}

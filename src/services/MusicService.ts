import { Service } from "typedi";
import { Repository, Like } from "typeorm";
import Music from "../models/Music";
import BaseService from "./BaseService";

@Service()
export default class MusicService extends BaseService {
  private musicRepository: Repository<Music>;
  constructor() {
    super();
    this.musicRepository = this.initializeModelRepository(Music);
  }
}

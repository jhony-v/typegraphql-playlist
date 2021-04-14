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

  
  async findMusicsByAlbumId(albumId: number): Promise<Music[]> {
    return this.musicRepository.find({
      where: {
        album: {
          id: albumId,
        },
      },
    });
  }

  async findMusicById(musicId: string): Promise<Music | null> {
    const response = await this.musicRepository.findOne({
      where: {
        id: musicId,
      },
    });
    return response ? response : null;
  }

  async searchMusics(searchValue: string): Promise<Music[]> {
    return this.musicRepository.find({
      where: [
        { name: Like(searchValue) },
        { album: Like(searchValue) },
        { minutesDuration: Like(searchValue) },
      ],
    });
  }
}

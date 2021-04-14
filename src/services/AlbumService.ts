import { Service } from "typedi";
import { Repository } from "typeorm";
import Album from "../models/Album";
import BaseService from "./BaseService";

@Service()
export default class AlbumService extends BaseService {
  private albumRepository: Repository<Album>;
  constructor() {
    super();
    this.albumRepository = this.initializeModelRepository(Album);
  }

  async findAlbum(albumId: number): Promise<Album | null> {
    const response = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },
    });
    return response || null;
  }
}

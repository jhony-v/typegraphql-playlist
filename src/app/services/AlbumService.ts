import { Service } from "typedi";
import { Repository } from "typeorm";
import Album from "../models/Album";
import User from "../models/User";
import BaseService from "./BaseService";

@Service()
export default class AlbumService extends BaseService {
  private albumRepository: Repository<Album>;
  private userRepository : Repository<User>;
  constructor() {
    super();
    this.albumRepository = this.initializeModelRepository(Album);
    this.userRepository = this.initializeModelRepository(User);
  }

  async findAlbum(albumId: number): Promise<Album | null> {
    const response = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },
    });
    return response || null;
  }

  async findAlbumsByUserId(userId : number) : Promise<Album[]> {
    return this.albumRepository.find({
      where : {
        user : {
          id : userId
        }
      }
    });
  }

  async createAlbum(params : { image : string, name : string, userId : number }) : Promise<Album> {
    const user = await this.userRepository.findOne({
      where : {
        id : params.userId,
      }
    })
    if(user) {
      const album : Album = new Album();
      album.image = params.image;
      album.name = params.name;
      album.user = user;
      return this.albumRepository.create(album);
    }
    throw new Error('User not found to save an album');
  }
}

import { Service } from "typedi";
import { Repository } from "typeorm";
import Album from "../models/Album";
import BaseService from "./BaseService";

@Service()
export default class AlbumService extends BaseService{
    private albumRepository : Repository<Album>;
    constructor(){
        super()
        this.albumRepository = this.initializeModelRepository(Album);
    }

}
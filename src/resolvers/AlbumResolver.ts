import { Arg, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import Album from "../models/Album";
import AlbumService from "../services/AlbumService";

@Service()
@Resolver()
export default class AlbumResolver {
    constructor(private readonly albumService : AlbumService){}

    @Query(() => Album,{nullable:true})
    async album(@Arg("id") id : number = 0) : Promise<Album | null> {
        return this.albumService.findAlbum(id);
    }
}
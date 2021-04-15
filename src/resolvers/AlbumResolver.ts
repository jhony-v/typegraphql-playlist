import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { GetAlbumFilterArgs } from "../graphql/args";
import { AddAlbumInput } from "../graphql/inputs";
import Album from "../app/models/Album";
import AlbumService from "../app/services/AlbumService";
import LoggerMiddleware from "../middlewares/logger.middleware";

@Service()
@Resolver()
export default class AlbumResolver {
    constructor(private readonly albumService : AlbumService){}

    @UseMiddleware(LoggerMiddleware)
    @Query(() => Album,{nullable:true})
    async album(@Arg("id") id : number = 0) : Promise<Album | null> {
        return this.albumService.findAlbum(id);
    }

    @Query(() => [Album])
    async albums(@Args() { userId } : GetAlbumFilterArgs) : Promise<Album[]> {
        if(userId) return this.albumService.findAlbumsByUserId(userId);
        return []  
    }

    @Mutation(() => Album)
    async createAlbum(@Arg("payload") payload : AddAlbumInput) : Promise<Album> {
        return this.albumService.createAlbum(payload)
    }
}
import {
   Arg,
   Args,
   Mutation,
   Query,
   Resolver,
   UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { GetAlbumFilterArgs } from "../graphql/args";
import { AddAlbumInput } from "../graphql/inputs";
import Album from "../app/models/Album";
import AlbumService from "../app/services/AlbumService";
import AuthorizedMiddleware from "../middlewares/Authorized.middleware";

@Service()
@Resolver()
export default class AlbumResolver {
   constructor(private readonly albumService: AlbumService) {}

   @UseMiddleware(AuthorizedMiddleware)
   @Query(() => Album, { nullable: true })
   async album(@Arg("id") id: number): Promise<Album | null> {
      return this.albumService.findAlbum(id);
   }

   @UseMiddleware(AuthorizedMiddleware)
   @Query(() => [Album])
   async albums(@Args() { userId }: GetAlbumFilterArgs): Promise<Album[]> {
      if (userId) return this.albumService.findAlbumsByUserId(userId);
      return [];
   }

   @UseMiddleware(AuthorizedMiddleware)
   @Mutation(() => Album)
   async createAlbum(@Arg("payload") payload: AddAlbumInput): Promise<Album> {
      return this.albumService.createAlbum(payload);
   }
}

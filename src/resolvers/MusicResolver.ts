import { Service } from "typedi";
import Music from "../app/models/Music";
import MusicService from "../app/services/MusicService";
import { GetMusicFilterArgs } from "../graphql/args";
import { Arg, Args, Authorized, Query, Resolver } from "type-graphql";
import { AUTH_ROLES } from "../app/authorization/authRoles";

@Service()
@Resolver()
export default class MusicResolver {
  constructor(private readonly musicService: MusicService) {}

  @Authorized(AUTH_ROLES.USER_LOGGED)
  @Query(() => [Music])
  async musics(
    @Args() { albumId, searchValue }: GetMusicFilterArgs
  ): Promise<Music[]> {
    if (albumId) return this.musicService.findMusicsByAlbumId(albumId);
    if (searchValue) return this.musicService.searchMusics(searchValue);
    return [];
  }

  @Authorized(AUTH_ROLES.USER_LOGGED)
  @Query(() => Music, { nullable: true })
  async music(@Arg("id") id: string): Promise<Music | null> {
    return this.musicService.findMusicById(id);
  }
}

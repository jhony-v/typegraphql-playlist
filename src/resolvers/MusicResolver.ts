import { Service } from "typedi";
import Music from "../models/Music";
import MusicService from "../services/MusicService";
import { GetMusicFilterArgs } from "../graphql/args";
import { Arg, Args, Query, Resolver } from "type-graphql";

@Service()
@Resolver()
export default class MusicResolver {
  constructor(private readonly musicService: MusicService) {}

  @Query(() => [Music])
  async musics(
    @Args() { albumId, searchValue }: GetMusicFilterArgs
  ): Promise<Music[]> {
    if (albumId) return this.musicService.findMusicsByAlbumId(albumId);
    if (searchValue) return this.musicService.searchMusics(searchValue);
    return [];
  }

  @Query(() => Music, { nullable: true })
  async music(@Arg("id") id: string): Promise<Music | null> {
    return this.musicService.findMusicById(id);
  }
}

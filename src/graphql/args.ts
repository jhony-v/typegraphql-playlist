import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class GetMusicFilterArgs {
  @Field(() => String, { nullable: true })
  searchValue?: string;

  @Field(() => Int, { nullable: true })
  musicId?: number;

  @Field(() => Int, { nullable: true })
  albumId?: number;
}

@ArgsType()
export class GetAlbumFilterArgs {
  @Field(() => Int, { nullable: true })
  userId?: number;
}

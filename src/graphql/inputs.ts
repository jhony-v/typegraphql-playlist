import { Field, InputType } from "type-graphql";
import Album from "../app/models/Album";
import User from "../app/models/User";

@InputType()
export class AddUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field({ nullable: true })
  fullName: string;

  @Field()
  isPersonal: boolean;

  @Field(() => [String],{nullable:true,defaultValue:[]})
  tags: string[];
}



@InputType()
export class AddAlbumInput implements Partial<Album> {
    @Field()
    name: string;

    @Field()
    image : string;

    @Field()
    userId : number;

}
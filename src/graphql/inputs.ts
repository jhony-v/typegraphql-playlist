import { Field, InputType } from "type-graphql";
import User from "../models/User";

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

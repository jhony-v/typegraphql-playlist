import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class AuthLogin implements Partial<Omit<AuthLogin,"password">> {
    
    @Field(() => ID)
    id : number;

    @Field()
    username : string;

    @Field()
    fullName : string;

    @Field()
    createdAt : string;

    @Field(() => [String])
    tags : string[];

}
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Auth {
    @Field()
    id : number;

    @Field()
    username : string;

    @Field()
    fullName : string;


    @Field()
    isPersonal : boolean;

    @Field()
    token : string;
}
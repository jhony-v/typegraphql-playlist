import { MaxLength } from "class-validator";
import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Album from "./Album";

@ObjectType()
@Entity()
export default class User extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id : number;

    @Field({nullable:true})
    @MaxLength(40)
    @Column({nullable:true})
    fullName : string;

    @Field({nullable:true})
    @MaxLength(20)
    @Column()
    username : string;

    @Field()
    @Column({default:true})
    isPersonal : boolean;

    @Field({nullable:true})
    @CreateDateColumn()
    createdAt : string;

    @Field(() => [String])
    @Column("simple-array")
    tags : string[]

    @Field(() => [Album])
    @OneToMany(() => Album, album => album.user)
    albums : Album[]
}
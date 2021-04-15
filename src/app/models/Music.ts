import { Field, ID, ObjectType } from "type-graphql";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Album from "./Album";

@ObjectType()
@Entity()
export default class Music {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Field()
    @Column()
    name : string;

    @Field()
    @Column()
    url : string;

    @Field()
    @Column()
    minutesDuration : string;

    @Field(() => Album)
    @ManyToOne(() => Album, album => album.musics,{
        cascade : true
    })
    album: Album
}
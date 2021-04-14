import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Music from "./Music";
import User from "./User";

@ObjectType()
@Entity()
export default class Album {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id : number;

    @Field()
    @Column()
    name : string

    @Field()
    @Column()
    image : string;

    @Field()
    @CreateDateColumn()
    createdAt : string

    @Field(() => User)
    @ManyToOne(() => User, user => user.albums)
    user : User

    @Field(() => [Music])
    @OneToMany(() => Music, music => music.album)
    musics : Music[];
}
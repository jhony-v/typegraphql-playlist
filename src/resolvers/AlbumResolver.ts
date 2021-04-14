import { Resolver } from "type-graphql";
import { Service } from "typedi";
import AlbumService from "../services/AlbumService";

@Service()
@Resolver()
export default class AlbumResolver {
    constructor(private readonly albumService : AlbumService){}
}
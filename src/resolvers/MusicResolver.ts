import { Resolver } from "type-graphql";
import { Service } from "typedi";
import MusicService from "../services/MusicService";

@Service()
@Resolver()
export default class MusicResolver {
    constructor(private readonly musicService : MusicService) {}
}
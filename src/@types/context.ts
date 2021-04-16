import { Request } from "express";
import JsonWebTokenService from "../app/services/JsonWebTokenService";

export interface ContextApplication {
    jsonTokenService : JsonWebTokenService,
    request : Request
}
import { Service } from "typedi";
import jwt from "jsonwebtoken";
import { PERSONAL_TOKEN } from "../config/environments";

@Service()
export default class JsonWebTokenService {
   private TOKEN : string = PERSONAL_TOKEN;

   sign<T extends Record<string, unknown>>(payload: T): string {
      return jwt.sign(payload, this.TOKEN);
   }

   async verify(token: string): Promise<Record<string, unknown> | Error> {
      return new Promise((resolve, reject) => {
         jwt.verify(token,this.TOKEN, (error, decoded) => {
            if (error) reject(new Error(error.message));
            resolve((decoded ||{}) as Record<string,unknown>)
         });
      });
   }
}

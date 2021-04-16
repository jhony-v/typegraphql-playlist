import { Service } from "typedi";
import bcrypt from "bcrypt"

@Service()
export default class PasswordVerifyService {
    async hash(password : string) : Promise<string> {
        return bcrypt.hash(password,10);
    }

    async check(password : string, hashPassword : string) : Promise<boolean> {
        const match = await bcrypt.compare(password,hashPassword);
        return match;
    }
}
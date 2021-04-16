import dotenv from "dotenv";
dotenv.config();

export const MYSQL_USERNAME = process.env.MYSQL_USERNAME as string
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD as string
export const MYSQL_HOST  = process.env.MYSQL_HOST as string
export const MYSQL_DATABASE  = process.env.MYSQL_DATABASE as string
export const MYSQL_PORT  = Number(process.env.MYSQL_PORT) as number
export const PERSONAL_TOKEN = process.env.PERSONAL_TOKEN as string
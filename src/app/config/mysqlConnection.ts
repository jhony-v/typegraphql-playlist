import { createConnection } from "typeorm";
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USERNAME } from "./environments";

export const mysqlConnection = createConnection({
    username : MYSQL_USERNAME,
    password  :MYSQL_PASSWORD,
    port : MYSQL_PORT,
    database : MYSQL_DATABASE,
    host : MYSQL_HOST,
    type : "mysql",
    synchronize : true,
    logging : false,
    entities : [
        "src/app/models/**/*.ts"
    ]
})
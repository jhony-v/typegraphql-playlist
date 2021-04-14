import "reflect-metadata";
import { Container } from "typedi"
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { mysqlConnection } from "./config/mysqlConnection";

async function main() {
  try {
    await mysqlConnection;

    const schema = await buildSchema({
      resolvers: [`${__dirname}/resolvers/**/*.ts`],
      container : Container
    });

    const server = new ApolloServer({
      schema,
    });

    const { url }  = await server.listen(process.env.PORT || 7000);
    console.log(url)
  } catch (e) {
    console.error(e.message);
  }
}

main();

import "reflect-metadata";
import { Container } from "typedi"
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { mysqlConnection } from "./app/config/mysqlConnection";
import authChecker from "./app/authorization/authChecker";

async function main() {
  try {
    await mysqlConnection;

    const schema = await buildSchema({
      resolvers: [`${__dirname}/resolvers/**/*.ts`],
      authChecker,
      container : Container,
    });

    const server = new ApolloServer({
      schema,
      context : () => ({
        username: "jhony"
      })
    });

    const { url }  = await server.listen(process.env.PORT || 7000);
    console.log(url)
  } catch (e) {
    console.error(e.message);
  }
}

main();

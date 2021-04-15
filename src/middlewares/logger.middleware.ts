import { MiddlewareFn } from "type-graphql";

const LoggerMiddleware : MiddlewareFn = async ({},next) => {
    console.log("logging")
    await next();
}

export default LoggerMiddleware;
import { MiddlewareFn } from "type-graphql";
import { ContextApplication } from "../@types/context";

const AuthorizedMiddleware : MiddlewareFn<ContextApplication> = async ({context},next) => {
    const token = context.request.query.token as string
    await context.jsonTokenService.verify(token)
    await next();
}

export default AuthorizedMiddleware;
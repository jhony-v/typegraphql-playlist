import { AuthChecker } from "type-graphql";
import { ContextApplication } from "../../@types/context";
import { AUTH_ROLES } from "./authRoles";

const authChecker : AuthChecker<ContextApplication> = ({},roles) => {
    if(roles.includes(AUTH_ROLES.USER_LOGGED)) true;
    return false;
}

export default authChecker;
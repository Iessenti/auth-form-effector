import { createRoutesView } from "atomic-router-react";
import { LoginRoute } from "./login";
import { SignupRoute } from "./signup";

export const PagesList = createRoutesView({
    routes: [LoginRoute, SignupRoute],
})
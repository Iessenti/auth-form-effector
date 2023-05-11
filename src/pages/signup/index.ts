import { createRouteView } from "atomic-router-react";
import { SignupPage } from "./page";
import { Loader } from "~/shared/ui/Loader/Loader";
import { anonRoute, curRoute } from "./model";

export const SignupRoute = {
    view: createRouteView({route: anonRoute, view: SignupPage, otherwise: Loader}),
    route: curRoute,
}
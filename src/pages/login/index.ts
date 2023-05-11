import { createRouteView } from "atomic-router-react";
import { LoginPage } from "./page";
import { Loader } from "~/shared/ui/Loader/Loader";
import { anonRoute, curRoute } from "./model";

export const LoginRoute = {
    view: createRouteView({route: anonRoute, view: LoginPage, otherwise: Loader}),
    route: curRoute,
}
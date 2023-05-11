import { createHistoryRouter, createRoute, createRouterControls } from "atomic-router";
import { started } from "./init/init";
import { createBrowserHistory } from "history";
import { sample } from "effector";

export const routes = {
    welcome: createRoute(),
    auth: {
        register: createRoute(),
        login: createRoute(),
    }
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
    routes: [
        {
            path: '/login',
            route: routes.auth.login
        },
        {
            path: '/register',
            route: routes.auth.register,
        },
        {
            path: '/',
            route: routes.auth.login
        }
    ]
})

sample({
    clock: started,
    fn: () => createBrowserHistory(),
    target: router.setHistory,
})

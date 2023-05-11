import { createEffect } from "effector";
import { requestFx } from "./request";

export type User = {
    email: string;
    name: string;
}

interface UserLogin {
    email: string;
    password: string;
}

export type LoginError = 
    { error: 'invalid_data' }
    | { error: 'failed_request' }

export const loginFx = createEffect<UserLogin, User, LoginError>( (form_data) => {
    return requestFx({
        url: '/login',
        method: 'POST',
        body: form_data
    })
})

interface UserSignup {
    email: string;
    name: string;
    password: string;
}

export const signupFx = createEffect<UserSignup, User, LoginError>( (form_data) => {
    return requestFx({
        url: '/signup',
        method: 'POST',
        body: form_data
    })
})

export type SessionError = { error: 'not_authorized' }

export const sessionFx = createEffect<void, User, SessionError>( () => {
    return requestFx({
        url: '/session',
        method: 'GET'
    })
})

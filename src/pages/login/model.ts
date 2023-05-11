import { attach, createEvent, createStore, sample } from "effector";
import { and, every, not, or, reset } from "patronum";

import * as api from '~/shared/api';
import { routes } from "~/shared/routing";
import { chainAnonym, sessionRequestFx } from "~/shared/session";

export enum errors_values {
    empty = 'empty',
    invalid = 'invalid'
}

export const curRoute = routes.auth.login;
export const anonRoute = chainAnonym(curRoute, {
    otherwise: routes.welcome.open,
});

const loginFx = attach({effect: api.loginFx})

export const pageMounted = createEvent();

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const formSubmitted = createEvent();

export const $email = createStore('');
export const $password = createStore('');

export const $emailError = createStore<null | errors_values.empty | errors_values.invalid>(null);
export const $passwordError = createStore<null | errors_values.empty | errors_values.invalid>(null);

export const $error = createStore<api.LoginError | null>(null);

export const $authorizationPending = createStore(false);
export const $loginPending = loginFx.pending;
export const $formBlocked = or($loginPending, $authorizationPending)
const $formValid = every({
    stores: [$emailError, $passwordError],
    predicate: null,
  });

reset({
    clock: pageMounted,
    target: [$email, $emailError, $password, $passwordError]
})

$email.on(emailChanged, (_, email) => email);
$password.on(passwordChanged, (_, password) => password);

$emailError.on(emailChanged, () => null)
$passwordError.on(passwordChanged, () => null)

$error.reset(formSubmitted);

sample({
    clock: formSubmitted,
    source: $email,
    fn: (email) => {
        if (checkIsEmpty(email)) return errors_values.empty
        if (!checkIsEmailValid(email)) return errors_values.invalid
        return null
    },
    target: $emailError
});

sample({
    clock: formSubmitted,
    source: $password,
    fn: (password) => {
        if (checkIsEmpty(password)) return errors_values.empty
        if (!checkIsPasswordValid(password)) return errors_values.invalid
        return null
    },
    target: $passwordError
});

sample({
    clock: formSubmitted,
    source: {email: $email, password: $password},
    filter: and(not($formBlocked), $formValid),
    target: loginFx,
  });

sample({
    clock: loginFx.done,
    target: sessionRequestFx,
});

$error.on(loginFx.failData, (_, error) => error);


const checkIsEmailValid = (email: string) => email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

const checkIsPasswordValid = (password: string) => password.length >= 6;

const checkIsEmpty = (value: string) => value.trim().length === 0;

import { attach, createEvent, createStore, sample } from "effector";
import { and, every, not, or, reset } from "patronum";

import * as api from '~/shared/api';
import { routes } from "~/shared/routing";
import { chainAnonym, sessionRequestFx } from "~/shared/session";

export enum errors_values {
    empty = 'empty',
    invalid = 'invalid'
}

export const curRoute = routes.auth.register;
export const anonRoute = chainAnonym(curRoute, {
    otherwise: routes.welcome.open,
});

const signupFx = attach({effect: api.signupFx})

export const pageMounted = createEvent();

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const nameChanged = createEvent<string>();
export const formSubmitted = createEvent();

export const $email = createStore('');
export const $password = createStore('');
export const $name = createStore('');

export const $emailError = createStore<null | errors_values.empty | errors_values.invalid>(null);
export const $passwordError = createStore<null | errors_values.empty | errors_values.invalid>(null);
export const $nameError = createStore<null | errors_values.empty | errors_values.invalid>(null);

export const $error = createStore<api.LoginError | null>(null);

export const $authorizationPending = createStore(false);
export const $signupPending = signupFx.pending;
export const $formBlocked = or($signupPending, $authorizationPending);
const $formValid = every({
    stores: [$emailError, $passwordError, $nameError],
    predicate: null,
  });

reset({
    clock: pageMounted,
    target: [$email, $emailError, $password, $passwordError, $name, $nameError]
})

$email.on(emailChanged, (_, email) => email);
$password.on(passwordChanged, (_, password) => password);
$name.on(nameChanged, (_, name) => name);

$emailError.on(emailChanged, () => null);
$passwordError.on(passwordChanged, () => null);
$nameError.on(nameChanged, () => null);

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
    source: $name,
    fn: (name) => {
        if (checkIsEmpty(name)) return errors_values.empty
        return null
    },
    target: $passwordError
});

sample({
    clock: formSubmitted,
    source: {email: $email, password: $password, name: $name},
    filter: and(not($formBlocked), $formValid),
    target: signupFx,
  });

sample({
    clock: signupFx.done,
    target: sessionRequestFx,
});

$error.on(signupFx.failData, (_, error) => error);


const checkIsEmailValid = (email: string) => email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

const checkIsPasswordValid = (password: string) => password.length >= 6;

const checkIsEmpty = (value: string) => value.trim().length === 0;

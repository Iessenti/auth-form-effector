import {createEffect} from 'effector';

interface Request {
    url: string;
    method: 'GET' | 'POST';
    body?: unknown;
}

export const requestFx = createEffect<Request, any>( (req) => {
    return fetch(
        req.url,
        {
            method: req.method,
            headers: {
                ['Content-Type']: 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req.body)
        },
    )
        .then( (response) => response.json())
        .catch( (response) => Promise.reject(response.response.data))
})
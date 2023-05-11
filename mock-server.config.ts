import type {MockServerConfig} from 'mock-config-server';

export const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/login',
        method: 'post',
        routes: [
          {
            data: {error: 'invalid_request'},
            interceptors: {
              response: (data, {setStatusCode}) => {
                setStatusCode(400);
                return data;
              },
            },
          },
          {
            data: {error: 'invalid_credentials'},
            entities: {
              body: {
                email: 'iessenti@gmail.com',
              },
            },
            interceptors: {
              response: (data, {setStatusCode}) => {
                setStatusCode(403);
                return data;
              },
            },
          },
          {
            data: {email: 'sergeysova@gmail.com', username: 'sergeysova'},
            entities: {
              body: {
                email: 'iessenti@gmail.com',
                password: 'test123',
              },
            },
            interceptors: {
              response: (data, {appendHeader}) => {
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');
                return data;
              },
            },
          },
        ],
      },
      {
        path: '/signup',
        method: 'post',
        routes: [
          {
            data: {
              name: 'nikita'
            },
            interceptors: {
              response: (data, {appendHeader, request}) => {
                appendHeader('Set-Cookie', 'token=auth-user-token');
                return {...data, email: request.body.email};
              },
            },
          },
        ],
      },
      {
        path: '/session',
        method: 'get',
        routes: [
          {
            data: {email: 'iessenti@gmail.com', name: 'nikita'},
            interceptors: {
              response: (data, {request, setStatusCode}) => {
                console.log(request.headers.cookie);
                if (request.headers.cookie === 'token=auth-user-token') return data;

                setStatusCode(401);
                return {error: 'unauthorized'};
              },
            },
          },
        ],
      },
      
    ],
  },
};

export default mockServerConfig;

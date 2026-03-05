import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const CUSTOMER = {
  KEY: '567ec203-f728-4a2e-a4a4-45ad36560a52'
} as const;

export const COOKIE_CONFIG: Partial<ResponseCookie> = {
  maxAge: 60 * 60 * 24 * 30, // 30 días
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: false // funciona en localhost y prod aunque sea inseguro
};

export const SEARCH_PARAMS_KEY = {
  redirectTo: 'redirectTo'
}

export const PATH_GO_TO = {
  createCustomer: '/4?redirectTo=/5'
}
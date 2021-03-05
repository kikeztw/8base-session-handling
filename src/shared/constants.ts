export const WORKSPACE_ID = process.env.REACT_APP_WORKSPACE_ID || '';
export const AUTH_CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '';
export const AUTH_CLIENT_DOMAIN = process.env.REACT_APP_CLIENT_DOMAIN || '';
export const AUTH_REDIRECT_URL = `${window.location.origin}/auth/callback`;
export const AUTH_LOGOUT_URL = `${window.location.origin}/logout`;
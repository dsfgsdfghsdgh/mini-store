import { CookieOptions, Response } from "express";

// Constants
export const REFRESH_PATH = "/api/v1/auth/refresh";

// Helper functions for expiration times (reusing your existing ones)
// Assuming these are already defined in your project:
// import { fifteenMinuteFromNow, thirtyDaysFromNow } from "./customTime";

// Base cookie configuration
const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};

// Cookie options with proper typing
const accessTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  path: '/',
  expires: fifteenMinuteFromNow(),
});

const refreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  path: REFRESH_PATH,
  expires: thirtyDaysFromNow(),
});

// Type definitions
type SetAuthParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

type SetTokenParams = {
  res: Response;
  accessToken?: string;
  refreshToken?: string;
};

// Exported functions with consistent parameter structure
export const setAuthCookies = ({ res, accessToken, refreshToken }: SetAuthParams): Response => {
  return res
    .cookie("accessToken", accessToken, accessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
};

export const setAccessTokenCookie = ({ res, accessToken }: SetTokenParams): Response => {
  if (!accessToken) throw new Error("Access token is required");
  return res.cookie("accessToken", accessToken, accessTokenCookieOptions());
};

export const setRefreshTokenCookie = ({ res, refreshToken }: SetTokenParams): Response => {
  if (!refreshToken) throw new Error("Refresh token is required");
  return res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
};

export const clearAuthCookies = (res: Response): Response => {
  return res
    .clearCookie("accessToken", { path: '/' })
    .clearCookie("refreshToken", { path: REFRESH_PATH });
};

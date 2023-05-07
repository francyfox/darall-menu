import { sign } from "jsonwebtoken";
import { CONFIG } from "../env.config";

function generateAccessToken(user: { id: string }): string {
  return sign({ userId: user.id }, CONFIG.JWT_ACCESS_SECRET, {
    expiresIn: '20m',
  });
}

export type jwtPayload = {
  userId: string,
  tokenId: string
}

export function generateRefreshToken(user: { id: string }, tokenId: string): string {
  const payload: jwtPayload = {
    userId: user.id,
    tokenId
  }

  return sign(payload, CONFIG.JWT_REFRESH_SECRET, {
    expiresIn: '12h',
  });
}

export function generateTokens(user: any, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}
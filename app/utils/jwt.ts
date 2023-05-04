import { sign } from "jsonwebtoken";
import { CONFIG } from "../env.config";
import { db } from "../const";

function generateAccessToken(user: { id: string }): string {
  return sign({ userId: user.id }, CONFIG.JWT_ACCESS_SECRET, {
    expiresIn: '5m',
  });
}

export function generateRefreshToken(user: { id: string }, jti: string): string {
  return sign({
    userId: user.id,
    jti
  }, CONFIG.JWT_REFRESH_SECRET, {
    expiresIn: '4h',
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
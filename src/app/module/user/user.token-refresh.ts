import { Response } from "express";
import { verify } from "jsonwebtoken";
import { CONFIG } from "../../env.config";
import { db } from "../../const";
import { generateTokens, jwtPayload } from "../../utils/jwt";
import { hashToken } from "../../utils/crypto";
import { v4 as uuidv4 } from "uuid";

export async function userTokenRefresh(response: Response, token: string) {
  if (!token) {
    response.status(400);
    throw new Error('Missing refresh token');
  }

  const payload = verify(token, CONFIG.JWT_REFRESH_SECRET) as jwtPayload

  const refreshTokenFromDb = await db.refreshToken.findUnique({
    where: {
      id: payload.tokenId
    },
  })

  if (!refreshTokenFromDb) {
    response.status(400)
    throw new Error('Auth error');
  }

  const { hashedToken } = refreshTokenFromDb
  const oldHashedToken = hashToken(token)

  const user = await db.user.findUnique({
    where: {
      id: payload.userId
    }
  })

  if (hashedToken !== oldHashedToken || !user) {
    response.status(400)
    throw new Error('Auth error');
  }

  const uuid = uuidv4()
  const { accessToken, refreshToken} = generateTokens(user, uuid);
  await db.refreshToken.create({
    data: {
      id: uuid,
      hashedToken: hashToken(refreshToken),
      userId: user.id
    },
  })

  return {
    accessToken,
    refreshToken,
  }
}
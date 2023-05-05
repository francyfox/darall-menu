import { db } from "../../const";
import { compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt";
import { hashToken } from "../../utils/crypto";
import { Response } from "express";

export async function userAuth(response: Response, email: string, password: string) {

  if (!email || !password) {
    response.status(400);
    throw new Error('You must provide an email and a password.');
  }

  const user = await db.user.findUnique({
    where: {
      // @ts-ignore
      email
    }
  })

  if (!user) {
    response.status(403)
    throw new Error('User with this email not found')
  }

  const isPassValid = await compare(password, user.password);

  if (!isPassValid) {
    response.status(403)
    throw new Error('Password is not valid, try again :)')
  }

  const uuid = uuidv4()
  const { accessToken, refreshToken} = generateTokens(user, uuid);
  await db.refreshToken.create({
    data: {
      id: uuid,
      hashedToken: hashToken(refreshToken),
      userId: user.id
    },
  });

  return {
    accessToken, refreshToken
  }
}
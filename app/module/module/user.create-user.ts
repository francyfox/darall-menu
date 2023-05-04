import { hash } from "bcrypt";
import { db } from "../../const";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt";

type User = {
  email: string,
  password: string,
}
export default async function createUser(userForm: User) {

  userForm.password = await hash(userForm.password, 10)

  // @ts-ignore
  const user = await db.user.create({
    data: userForm
  })
  const id = uuidv4()
  const {accessToken, refreshToken} = generateTokens(user, id);

  await db.refreshToken.create({
    data: {
      id,
      hashedToken: refreshToken,
      userId: user.id
    }
  })

  return {
    accessToken, refreshToken
  }
}
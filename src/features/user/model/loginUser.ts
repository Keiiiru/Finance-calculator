import { getUserForLogin } from "~/entities/user/getUserForLogin";
import { updateRefreshToken } from "~/entities/user/updateRefreshToken";
import { comparePasswords } from "~/shared/lib/hash";
import { signAccessToken, signRefreshToken } from "~/shared/lib/jwt";
import { UserRequestFieldsType } from "~/shared/types";

export async function loginUser({ email, password }: UserRequestFieldsType) {
  if (!email || !password) throw new Error("Missing fields");

  try {
    const user = await getUserForLogin(email);

    const validatePassword = await comparePasswords(password, user.password);

    if (!validatePassword) throw new Error("Invalid credentials");

    const accessToken = signAccessToken(email);
    const refreshToken = signRefreshToken(email);

    updateRefreshToken(email, refreshToken);

    return { accessToken, refreshToken };
  } catch (e) {
    throw e;
  }
}

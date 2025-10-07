import { UserFeature } from "~/shared/lib/zod";
import { UserDTO, UserFeturesType } from "~/shared/types/user";
import { createUser } from "~/entities/user/createUser";
import { hashedPassword } from "~/shared/lib/hash";

export async function registerUser({
  email,
  password,
  username,
}: UserDTO): Promise<UserFeturesType> {
  try {
    await UserFeature.parseAsync({ username, email, password });
    const hPassword = await hashedPassword(password);
    await createUser({ username, email, password: hPassword });
  } catch (e) {
    throw e;
  }

  return { username, email };
}

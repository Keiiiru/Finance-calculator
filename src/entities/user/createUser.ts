import { prisma } from "~/shared/lib/prisma";
import { UserDTO } from "~/shared/types/user";

export async function createUser({
  username,
  email,
  password,
}: UserDTO): Promise<void> {
  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  } catch (e) {
    throw e;
  }
}

import { prisma } from "~/shared/lib/prisma";
import { UserEntityType } from "~/shared/types";

export async function getUserForLogin(email: string): Promise<UserEntityType> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { username: true, id: true, email: true, password: true },
  });

  if (!user) throw new Error("User is not exists");

  return user;
}

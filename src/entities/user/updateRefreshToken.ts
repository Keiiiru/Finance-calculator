import { prisma } from "~/shared/lib/prisma";

export async function updateRefreshToken(
  email: string,
  token: string
): Promise<void> {
  await prisma.user.update({
    where: { email },
    data: { refresh_token: token },
  });
}

import { TokenExpiredError } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  signAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "~/shared/lib/jwt";

export async function middleware(req: NextRequest) {
  const cookiesStore = await cookies();
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (accessToken) {
    try {
      verifyAccessToken(accessToken);
      return NextResponse.next();
    } catch (err) {
      if (!(err instanceof TokenExpiredError)) {
        return NextResponse.json(
          { error: "Invalid access token" },
          { status: 401 }
        );
      }
    }
  }

  try {
    const payload = verifyRefreshToken(refreshToken) as { email: string };
    const newAccessToken = signAccessToken(payload.email);

    const res = NextResponse.next();
    cookiesStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return res;
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 401 });
  }
}

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "~/features/user/model/loginUser";
import { UserRequestFieldsType } from "~/shared/types";

export async function POST(request: NextRequest) {
  const body: UserRequestFieldsType = await request.json();

  try {
    const tokens = await loginUser(body);

    const cookiesStore = await cookies();
    cookiesStore.set("refresh_token", tokens.refreshToken, { httpOnly: true });
    cookiesStore.set("access_token", tokens.accessToken, { httpOnly: true });

    return NextResponse.json(
      { message: "Successfuly login!" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

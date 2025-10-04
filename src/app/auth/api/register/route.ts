import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "~/features/user/model/createUser";
import { UserDTO } from "~/shared/types";

export async function POST(request: NextRequest) {
  try {
    const body: UserDTO = await request.json();
    const user = await registerUser(body);
    return NextResponse.json(
      { user, message: "Successfuly registered!" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: e,
      },
      { status: 500 }
    );
  }
}

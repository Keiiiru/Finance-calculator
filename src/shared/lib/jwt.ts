import jwt from "jsonwebtoken";

export function signAccessToken(email: string) {
  if (!process.env.JWT_SECRET) throw new Error("Something went wrong");
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(email: string) {
  if (!process.env.JWT_SECRET) throw new Error("Something went wrong");
  return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export function verifyAccessToken(token: string) {
  if (!process.env.JWT_SECRET) throw new Error("Something went wrong");
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyRefreshToken(token: string) {
  if (!process.env.JWT_SECRET) throw new Error("Something went wrong");
  return jwt.verify(token, process.env.JWT_SECRET);
}

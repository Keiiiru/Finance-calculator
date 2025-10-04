import bcrypt from "bcrypt";

export function hashedPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

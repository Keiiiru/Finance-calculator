export interface UserDTO {
  id?: string;
  email: string;
  username: string;
  password: string;
  refreshToken?: string;
}

export type UserFeturesType = Pick<UserDTO, "username" | "email">;

export type UserEntityType = Omit<UserDTO, "refreshToken">;

export type UserRequestFieldsType = Pick<UserDTO, "email" | "password">;

export type UserFormDataType = Pick<UserDTO, "username" | "email" | "password">;
